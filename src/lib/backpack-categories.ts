import {getApp,getApps,initializeApp} from "firebase/app";
import {getAuth,signInAnonymously} from "firebase/auth";
import {collection,getDocs,getFirestore,orderBy,query,where,addDoc,serverTimestamp} from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const isBackpackFirebaseConfigured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
const app = isBackpackFirebaseConfigured ? (getApps().length ? getApp() : initializeApp(config)) : null;
export const backpackDb = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export type SharedEngagementCategory = {id:string;label:string;normalized:string};
export async function listSharedEngagementCategories():Promise<SharedEngagementCategory[]> {
  if (!backpackDb) return [];
  const snapshot = await getDocs(query(collection(backpackDb,"backpackEngagementCategories"),orderBy("label")));
  return snapshot.docs.map(item=>({id:item.id,label:String(item.data().label||""),normalized:String(item.data().normalized||"")})).filter(item=>item.label);
}
export async function createOrFindSharedEngagementCategory(value:string):Promise<string> {
  const label=value.trim().replace(/\s+/g," ");
  if (!label) throw new Error("Enter a name for your custom category.");
  if (label.length>48) throw new Error("Category names must be 48 characters or fewer.");
  if (!backpackDb || !auth) throw new Error("Shared categories are not connected yet. Add the adhubmvp Firebase web configuration in Vercel and redeploy.");
  await signInAnonymously(auth);
  const normalized=label.toLocaleLowerCase();
  const categories=collection(backpackDb,"backpackEngagementCategories");
  const existing=await getDocs(query(categories,where("normalized","==",normalized)));
  if (!existing.empty) return String(existing.docs[0].data().label||label);
  await addDoc(categories,{label,normalized,createdAt:serverTimestamp(),source:"backpack-os"});
  return label;
}
