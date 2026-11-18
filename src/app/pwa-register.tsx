"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaRegister() {
  const [installable, setInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<InstallPromptEvent | null>(null);
  const [installCardDismissed, setInstallCardDismissed] = useState(false);

  useEffect(() => {
    const installPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as InstallPromptEvent);
      setInstallCardDismissed(false);
      setInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", installPrompt);
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", installPrompt);
    };
  }, []);

  async function install() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setInstallable(false);
  }

  return <>{installable && !installCardDismissed && <aside className="i13-install-card" aria-label="Install BACKPACK OS">
    <div className="i13-install-brand">
      <span className="i13-install-mark" aria-hidden="true">🎒</span>
      <span><strong>BACKPACK OS</strong><small>YOUR PERSONAL CHANNEL</small></span>
    </div>
    <button className="i13-install-close" type="button" aria-label="Dismiss install prompt" onClick={() => setInstallCardDismissed(true)}>×</button>
    <button className="i13-install-action" type="button" onClick={() => void install()}>Install BACKPACK OS <span aria-hidden="true">↗</span></button>
  </aside>}</>;
}
