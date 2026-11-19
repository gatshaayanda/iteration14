"use client";

import { useEffect, useRef, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface Window {
    __backpackInstallPrompt?: Event;
    __backpackPwaListenerReady?: boolean;
  }
}

const DISMISSED_KEY = "backpack-os:install-dismissed-at";
const DISMISS_FOR = 7 * 24 * 60 * 60 * 1000;

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

function isIosSafari() {
  const ua = navigator.userAgent || "";
  const ios = /iPad|iPhone|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return ios && /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo/i.test(ua);
}

function dismissedRecently() {
  try {
    const value = localStorage.getItem(DISMISSED_KEY);
    if (!value) return false;
    const at = Date.parse(value);
    return Number.isFinite(at) && Date.now() - at < DISMISS_FOR;
  } catch {
    return false;
  }
}

export default function PwaRegister() {
  const promptRef = useRef<InstallPromptEvent | null>(null);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const [installable, setInstallable] = useState(false);
  const [iosGuide, setIosGuide] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [updateReady, setUpdateReady] = useState(false);
  const [connection, setConnection] = useState<"online" | "offline" | "checking">("checking");
  const [storageWarning, setStorageWarning] = useState(false);\n  const [embeddedBrowser, setEmbeddedBrowser] = useState(false);\n  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const standalone = isStandalone();\n    const userAgent = navigator.userAgent || "";\n    setEmbeddedBrowser(/FBAN|FBAV|Instagram|Line\\/|LinkedInApp|Twitter|TikTok|Snapchat|; wv\\)/i.test(userAgent));
    setDismissed(dismissedRecently() || standalone);
    setIosGuide(!standalone && isIosSafari());

    const captureInstall = (event: Event) => {
      if (isStandalone()) return;
      event.preventDefault();
      promptRef.current = event as InstallPromptEvent;
      setInstallable(true);
      setDismissed(false);
    };
    const installed = () => {
      promptRef.current = null;
      setInstallable(false);
      setIosGuide(false);
      setDismissed(true);
      try { localStorage.removeItem(DISMISSED_KEY); } catch {}
    };

    // Adopt an event captured before React hydration, then listen for later events.
    window.__backpackPwaListenerReady = true;
    if (window.__backpackInstallPrompt) {
      const early = window.__backpackInstallPrompt;
      delete window.__backpackInstallPrompt;
      captureInstall(early);
    }
    window.addEventListener("beforeinstallprompt", captureInstall);
    window.addEventListener("appinstalled", installed);

    let active = true;
    let connectionCheck = 0;
    const verifyConnection = () => {
      const attempt = ++connectionCheck;
      if (!navigator.onLine) { setConnection("offline"); return; }
      setConnection("checking");
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5000);
      fetch("/", { method: "HEAD", cache: "no-store", signal: controller.signal })
        .then(response => { if (active && attempt === connectionCheck) setConnection(response.ok ? "online" : "offline"); })
        .catch(() => { if (active && attempt === connectionCheck) setConnection("offline"); })
        .finally(() => window.clearTimeout(timeout));
    };
    const onOffline = () => { connectionCheck++; setConnection("offline"); };
    const onOnline = () => verifyConnection();
    const protectLocalStorage = async () => {
      try {
        if (navigator.storage?.persist) await navigator.storage.persist();
        const estimate = await navigator.storage?.estimate?.();
        if (estimate?.quota && estimate.usage !== undefined && estimate.usage / estimate.quota >= 0.85) {
          if (active) setStorageWarning(true);
        }
      } catch { /* Storage protection is best-effort and must not block the app. */ }
    };
    verifyConnection();
    void protectLocalStorage();
    const inspect = () => {
      if (active && registrationRef.current?.waiting && navigator.serviceWorker.controller) {
        setUpdateReady(true);
      }
    };
    const refresh = () => {
      const registration = registrationRef.current;
      if (registration && navigator.onLine) void registration.update().then(inspect).catch(() => {});
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") { refresh(); verifyConnection(); }
    };
    const onControllerChange = () => {
      if (updateRequested.current) window.location.reload();
    };

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then(registration => {
        if (!active) return;
        registrationRef.current = registration;
        inspect();
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", inspect);
        });
        refresh();
      }).catch(() => {
        // Offline shell and online browsing remain usable if registration is unavailable.
      });
      navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    }

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      active = false;
      window.removeEventListener("beforeinstallprompt", captureInstall);
      window.removeEventListener("appinstalled", installed);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      document.removeEventListener("visibilitychange", onVisibility);
      navigator.serviceWorker?.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  const updateRequested = useRef(false);

  async function install() {
    const prompt = promptRef.current;
    if (!prompt) {
      if (iosGuide) window.location.assign("/iphone-install");
      return;
    }
    // Call the native prompt synchronously from the user's button interaction.
    try {
      const result = prompt.prompt();
      promptRef.current = null;
      setInstallable(false);
      const choice = await result.then(() => prompt.userChoice);
      if (choice.outcome === "dismissed") {
        try { localStorage.setItem(DISMISSED_KEY, new Date().toISOString()); } catch {}
        setDismissed(true);
      }
    } catch {
      // The native event is one-shot; never replace it with a fabricated install prompt.
      setInstallable(false);
    }
  }

  function dismissInstall() {
    try { localStorage.setItem(DISMISSED_KEY, new Date().toISOString()); } catch {}
    setDismissed(true);
  }

  function applyUpdate() {
    updateRequested.current = true;
    const waiting = registrationRef.current?.waiting;
    if (waiting) waiting.postMessage({ type: "SKIP_WAITING" });
    else window.location.reload();
    window.setTimeout(() => {
      if (updateRequested.current) window.location.reload();
    }, 1800);
  }

  return <>
    {((installable || iosGuide) && !dismissed) && <aside className="bp-install-card" aria-label="Install BACKPACK OS">
      <div className="bp-install-brand">
        <img className="bp-install-mark" src="/backpack-os-icon-v4.svg" alt="" />
        <span><strong>BACKPACK OS</strong><small>YOUR PERSONAL CHANNEL</small></span>
      </div>
      <button className="bp-install-close" type="button" aria-label="Dismiss install prompt" onClick={dismissInstall}>×</button>
      <button className="bp-install-action" type="button" onClick={() => void install()}>
        {iosGuide && !installable ? "How to add to Home Screen" : "Install BACKPACK OS"} <span aria-hidden="true">↗</span>
      </button>
    </aside>}
    <aside className={"bp-connectivity bp-connectivity-" + connection} role="status" aria-live="polite">
      <span className="bp-connectivity-dot" aria-hidden="true" />
      <span>{connection === "offline" ? "OFFLINE · SAVED ON THIS DEVICE" : connection === "checking" ? "RECONNECTING · CHECKING CONNECTION" : "ONLINE · LIVE CONNECTION"}</span>
    </aside>
    {embeddedBrowser && <aside className="bp-storage-warning" role="status"><strong>Open BACKPACK in your browser</strong><span>For the most reliable install and offline experience, use your device menu to open this page in Safari or Chrome.</span><button type="button" onClick={() => { void navigator.clipboard?.writeText(window.location.href).then(() => setLinkCopied(true)).catch(() => setLinkCopied(false)); }}> {linkCopied ? "Link copied" : "Copy page link"} </button></aside>}\n    {storageWarning && <aside className="bp-storage-warning" role="status">Browser storage is nearly full. Free device or browser storage to protect your saved Backpack work. Keep a separate copy of anything important.</aside>}
    {updateReady && <aside className="pwaUpdate" role="status" aria-live="polite">
      <div><strong>BACKPACK OS update ready</strong><span>Refresh to use the latest version.</span></div>
      <div className="pwaUpdateActions"><button className="button" type="button" onClick={applyUpdate}>Refresh</button><button className="pwaUpdateDismiss" type="button" onClick={() => setUpdateReady(false)}>Later</button></div>
    </aside>}
  </>;
}
