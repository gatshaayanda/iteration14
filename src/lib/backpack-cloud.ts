"use client";

import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db, hasFirebaseWebConfig } from "@/lib/firebase/client";

export type BackpackCloudStatus = "disabled" | "authenticating" | "connecting" | "synced" | "syncing" | "queued" | "offline" | "error";

export function startBackpackCloud(
  getLocalData: () => Record<string, unknown>,
  applyRemoteData: (data: Record<string, unknown>) => void,
  onStatus: (status: BackpackCloudStatus, detail?: string) => void,
  onIdentity: (uid: string) => void,
  onReady: () => void,
) {
  if (!hasFirebaseWebConfig) {
    onStatus("disabled", "Add the Firebase web configuration to enable cloud sync.");
    return () => {};
  }

  let stopped = false;
  let stopDocument: (() => void) | undefined;
  let activeUid = "";
  const stopAuth = onAuthStateChanged(auth, async user => {
    if (stopped) return;
    if (!user) {
      onStatus("authenticating", "Creating a private cloud identity for this browser.");
      try {
        await signInAnonymously(auth);
      } catch (error) {
        onStatus("error", error instanceof Error ? error.message : "Anonymous sign-in is unavailable. Enable Anonymous in Firebase Authentication.");
      }
      return;
    }
    if (activeUid === user.uid) return;
    activeUid = user.uid;
    onIdentity(user.uid);
    onStatus("connecting", "Connecting this Backpack to its private cloud record.");
    stopDocument?.();
    const reference = doc(db, "backpacks", user.uid);
    stopDocument = onSnapshot(reference, { includeMetadataChanges: true }, snapshot => {
      if (stopped) return;
      if (snapshot.metadata.hasPendingWrites) {
        if (snapshot.exists()) onReady();
        onStatus(typeof navigator !== "undefined" && !navigator.onLine ? "queued" : "syncing", "Changes are saved locally and waiting for cloud confirmation.");
        return;
      }
      if (snapshot.metadata.fromCache && !snapshot.exists()) {
        onStatus("offline", "Waiting for a connection before checking the cloud copy.");
        return;
      }
      if (!snapshot.exists()) {
        if (snapshot.metadata.fromCache) {
          onStatus("offline", "Waiting for a connection before creating or updating the cloud copy.");
          return;
        }
        onReady();
        const local = getLocalData();
        writeCloudDocument(reference, user.uid, local, onStatus, "Could not create the cloud Backpack.");
        return;
      }
      onReady();
      const cloud = snapshot.data();
      const remoteData = cloud.data;
      if (remoteData && typeof remoteData === "object") {
        const local = getLocalData();
        const remoteTime = Date.parse(String(cloud.updatedAt || ""));
        const localTime = Date.parse(String(local.updatedAt || ""));
        if (Number.isFinite(remoteTime) && remoteTime > localTime) {
          applyRemoteData(restoreLocalFiles(remoteData as Record<string, unknown>, local));
        } else if (Number.isFinite(localTime) && localTime > remoteTime) {
          writeCloudDocument(reference, user.uid, local, onStatus, "Could not update the cloud Backpack.");
        }
      }
      onStatus(snapshot.metadata.fromCache ? "offline" : "synced", snapshot.metadata.fromCache ? "Using the last cloud copy saved on this device." : "Your Backpack is synchronised.");
    }, error => {
      onStatus("error", error.message || "Cloud sync is unavailable. Your local Backpack is still available.");
    });
  });

  return () => {
    stopped = true;
    stopDocument?.();
    stopAuth();
  };
}

export async function queueBackpackCloudWrite(uid: string, data: Record<string, unknown>) {
  if (!uid || !hasFirebaseWebConfig) return;
  await setDoc(doc(db, "backpacks", uid), {
    ownerUid: uid,
    schemaVersion: 1,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : new Date().toISOString(),
    data: checkedCloudData(data),
  });
}

function writeCloudDocument(
  reference: ReturnType<typeof doc>,
  uid: string,
  data: Record<string, unknown>,
  onStatus: (status: BackpackCloudStatus, detail?: string) => void,
  fallback: string,
) {
  try {
    void setDoc(reference, {
      ownerUid: uid,
      schemaVersion: 1,
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : new Date().toISOString(),
      data: checkedCloudData(data),
    }).catch(error => onStatus("error", error instanceof Error ? error.message : fallback));
  } catch (error) {
    onStatus("error", error instanceof Error ? error.message : fallback);
  }
}

function checkedCloudData(data: Record<string, unknown>) {
  const cloudData = stripLocalFiles(data);
  const bytes = new TextEncoder().encode(JSON.stringify(cloudData)).length;
  if (bytes > 850_000) throw new Error("This Backpack is too large to fit in one cloud record. Large files stay on this device; remove oversized text or records to resume sync.");
  return cloudData;
}

function stripLocalFiles(data: Record<string, unknown>) {
  const copy = { ...data };
  if (typeof copy.profileImage === "string" && copy.profileImage.startsWith("data:")) copy.profileImage = "";
  if (Array.isArray(copy.engagements)) {
    copy.engagements = copy.engagements.map(item => {
      if (!item || typeof item !== "object") return item;
      const engagement = { ...(item as Record<string, unknown>) };
      if (typeof engagement.mediaData === "string" && engagement.mediaData.startsWith("data:")) engagement.mediaData = "";
      return engagement;
    });
  }
  return copy;
}

function restoreLocalFiles(remote: Record<string, unknown>, local: Record<string, unknown>) {
  const restored = { ...remote };
  if (!restored.profileImage && typeof local.profileImage === "string" && local.profileImage.startsWith("data:")) restored.profileImage = local.profileImage;
  if (Array.isArray(restored.engagements) && Array.isArray(local.engagements)) {
    const localById = new Map(local.engagements.filter(item => item && typeof item === "object").map(item => {
      const value = item as Record<string, unknown>;
      return [String(value.id || ""), value] as const;
    }));
    restored.engagements = restored.engagements.map(item => {
      if (!item || typeof item !== "object") return item;
      const engagement = item as Record<string, unknown>;
      const localItem = localById.get(String(engagement.id || ""));
      return !engagement.mediaData && localItem?.mediaData ? { ...engagement, mediaData: localItem.mediaData } : engagement;
    });
  }
  return restored;
}
