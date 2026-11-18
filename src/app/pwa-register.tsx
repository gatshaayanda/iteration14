"use client";

// Keep embedded-browser install enforcement explicit at the top-level PWA boundary.

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};
type InstallState = "hidden" | "native" | "embedded";

const INSTALL_DISMISSED_KEY = "iteration14:install:dismissed-at";
const INSTALL_DISMISS_MS = 7 * 24 * 60 * 60 * 1000;

function environment() {
  if (typeof window === "undefined") return { standalone: true, ios: false, android: false, embedded: false };
  const ua = navigator.userAgent || "";
  const standalone = window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
  const ios = /iPad|iPhone|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const embedded = /WhatsApp|Instagram|FBAN|FBAV|Messenger|Line\/|Twitter|TikTok|Snapchat/i.test(ua) ||
    (/Android/i.test(ua) && /; wv\)/i.test(ua));
  return { standalone, ios, android, embedded };
}

function isIosSafari() {
  if (typeof window === "undefined") return false;
  const nav = window.navigator;
  const ios = /iPad|iPhone|iPod/i.test(nav.userAgent) ||
    (nav.platform === "MacIntel" && nav.maxTouchPoints > 1);
  return ios && /Safari/i.test(nav.userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo/i.test(nav.userAgent);
}

function dismissedRecently() {
  try {
    const value = window.localStorage.getItem(INSTALL_DISMISSED_KEY);
    if (!value) return false;
    const at = Date.parse(value);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < INSTALL_DISMISS_MS;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(INSTALL_DISMISSED_KEY, new Date().toISOString());
  } catch {
    // Installation remains optional when storage is unavailable.
  }
}

function clearDismissal() {
  try { window.localStorage.removeItem(INSTALL_DISMISSED_KEY); } catch {}
}

export default function PwaRegister({ initialEmbedded = false, initialAndroid = false }: { initialEmbedded?: boolean; initialAndroid?: boolean }) {
  const installPromptRef = useRef<InstallPromptEvent | null>(null);
  const [installState, setInstallState] = useState<InstallState>(initialEmbedded ? "embedded" : "hidden");
  const [updateReady, setUpdateReady] = useState<ServiceWorker | null>(null);
  const [embeddedAndroid, setEmbeddedAndroid] = useState(initialEmbedded && initialAndroid);
  const [installHelpOpen, setInstallHelpOpen] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [canShowManualInstall, setCanShowManualInstall] = useState(false);
  const [installCardDismissed, setInstallCardDismissed] = useState(false);
  const [installCardExpanded, setInstallCardExpanded] = useState(true);
  const embeddedActionRef = useRef<HTMLButtonElement | null>(null);
  const reloadForUpdate = useRef(false);

  useEffect(() => {
    const env = environment();
    const embedded = initialEmbedded || env.embedded;
    setEmbeddedAndroid((initialEmbedded && initialAndroid) || (env.embedded && env.android));
    setCanShowManualInstall(isIosSafari() && !dismissedRecently());

    const onBeforeInstallPrompt = (event: Event) => {
      const current = environment();
      if (current.standalone) return;
      event.preventDefault();
      const prompt = event as InstallPromptEvent;
      installPromptRef.current = prompt;
      setInstallCardDismissed(dismissedRecently());
      setCanInstall(true);
      // Retain the one-shot native event for the user's explicit Install click.
      // Do not interrupt page load with a second, custom install screen.
    };

    const promptWindow = window as Window & { __iteration14InstallPrompt?: Event; __iteration14PwaListenerReady?: boolean };
    // The browser can emit beforeinstallprompt before React hydrates. Adopt the
    // event captured by the tiny beforeInteractive script before listening normally.
    promptWindow.__iteration14PwaListenerReady = true;
    const earlyPrompt = promptWindow.__iteration14InstallPrompt;
    if (earlyPrompt) {
      delete promptWindow.__iteration14InstallPrompt;
      onBeforeInstallPrompt(earlyPrompt);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    if (env.standalone && !embedded) {
      setInstallState("hidden");
    } else if (embedded) {
      // Embedded browsers are a compatibility gate, not an install promotion.
      setInstallState("embedded");
    }

    const requestInstall = () => {
      const current = environment();
      if (current.standalone) return;
      if (current.embedded) {
        setInstallState("embedded");
        return;
      }
      if (installPromptRef.current) {
        // Invoke the browser's native prompt directly from the customer's click.
        void install();
        return;
      }
      // Only iOS Safari needs manual guidance. On desktop/Android, do not replace
      // the browser-owned prompt with a custom explainer or fake install flow.
      if (current.ios && isIosSafari()) {
        setInstallHelpOpen(true);
        setInstallState("native");
      }
    };
    const appInstalled = () => {
      installPromptRef.current = null;
      setCanInstall(false);
      setCanShowManualInstall(false);
      setInstallHelpOpen(false);
      setInstallState("hidden");
      clearDismissal();
    };
    window.addEventListener("iteration14-open-install", requestInstall);
    window.addEventListener("appinstalled", appInstalled);

    let registration: ServiceWorkerRegistration | null = null;
    const inspect = () => {
      if (registration?.waiting && navigator.serviceWorker.controller) setUpdateReady(registration.waiting);
    };
    const register = async () => {
      if (!("serviceWorker" in navigator)) return;
      try {
        registration = await navigator.serviceWorker.register("/sw.js");
        inspect();
        registration.addEventListener("updatefound", () => {
          const worker = registration?.installing;
          if (!worker) return;
          worker.addEventListener("statechange", inspect);
        });
        await registration.update();
        inspect();
      } catch {}
    };

    void register();
    const controllerChange = () => { if (reloadForUpdate.current) window.location.reload(); };
    navigator.serviceWorker?.addEventListener("controllerchange", controllerChange);

    return () => {
      window.removeEventListener("iteration14-open-install", requestInstall);
      window.removeEventListener("appinstalled", appInstalled);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      navigator.serviceWorker?.removeEventListener("controllerchange", controllerChange);
    };
  }, [initialEmbedded, initialAndroid]);

  useEffect(() => {
    if (installState !== "embedded" && installState !== "native") return;

    const isEmbeddedGate = installState === "embedded";
    const previousOverflow = document.body.style.overflow;
    if (isEmbeddedGate) document.body.style.overflow = "hidden";
    if (installState === "embedded") embeddedActionRef.current?.focus();
    else document.querySelector<HTMLButtonElement>(".plugInstallPrimary")?.focus();

    const keepDialogFocused = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isEmbeddedGate) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          dismissInstall();
        }
      }
      if (event.key === "Tab" && isEmbeddedGate) {
        event.preventDefault();
        embeddedActionRef.current?.focus();
      }
    };

    window.addEventListener("keydown", keepDialogFocused, true);
    return () => {
      if (isEmbeddedGate) document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keepDialogFocused, true);
    };
  }, [installState, installHelpOpen]);

  async function install() {
    const prompt = installPromptRef.current;
    if (!prompt) {
      // Never manufacture a replacement prompt. Manual steps are only valid for
      // iOS Safari, where beforeinstallprompt is not available.
      if (isIosSafari()) {
        setInstallHelpOpen(true);
        setInstallState("native");
      }
      return;
    }
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "dismissed") rememberDismissal();
    } catch {
      // The event is one-shot and browser-controlled. Do not replace it with
      // generic Chrome-menu instructions when the native prompt fails.
    } finally {
      installPromptRef.current = null;
      setCanInstall(false);
      setInstallHelpOpen(false);
      setInstallState("hidden");
    }
  }

  function dismissInstall() {
    rememberDismissal();
    setInstallCardDismissed(true);
    setInstallHelpOpen(false);
    setInstallState("hidden");
  }

  function openBrowser() {
    const url = window.location.href;
    const env = environment();
    if (env.android) {
      window.location.href = "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end";
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function applyUpdate() {
    // Always provide a visible outcome. Normally controllerchange reloads as soon
    // as the waiting worker activates; the timeout covers a stale/nonresponsive worker.
    reloadForUpdate.current = true;
    if (updateReady) {
      try {
        updateReady.postMessage({ type: "SKIP_WAITING" });
      } catch {
        // The full navigation below remains the recovery path.
      }
    }
    window.setTimeout(() => {
      if (reloadForUpdate.current) window.location.reload();
    }, 1800);
  }

  const installShellStyle: CSSProperties = { position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 1000, maxWidth: 720, margin: "0 auto", padding: 16, borderRadius: 18, background: "#FFFFFF", color: "#111318", boxShadow: "0 12px 40px rgba(0,0,0,.18)", border: "1px solid rgba(17,19,24,.12)" };
  const embeddedInstallStyle: CSSProperties = { position: "fixed", inset: 0, zIndex: 2147483647, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,.82)", backdropFilter: "blur(4px)", overscrollBehavior: "contain" };
  const installCard = installState === "native" && installHelpOpen && isIosSafari() ? (
    <div style={installShellStyle} role="presentation">
      <section className="plugInstallModal" role="dialog" aria-modal="false" aria-labelledby="plug-install-title" aria-describedby="plug-install-message">
        <div className="plugInstallTop"><span className="plugInstallMark">14</span><span className="plugInstallTag">BACKPACK OS · PERSONAL</span><button type="button" className="plugInstallClose" aria-label="Close install guidance" onClick={dismissInstall}>×</button></div>
        <div className="plugInstallKicker">IPHONE & IPAD</div>
        <h2 id="plug-install-title">Add Iteration 14 to Home Screen.</h2>
        <p id="plug-install-message">In Safari, tap <b>Share</b>, choose <b>Add to Home Screen</b>, then tap <b>Add</b>. Open the new Home Screen icon to launch the installed app.</p>
        <button type="button" className="plugInstallPrimary" onClick={dismissInstall}>Continue on the website</button>
      </section>
    </div>
) : installState === "embedded" ? (
    <div style={embeddedInstallStyle} role="alertdialog" aria-modal="true" aria-labelledby="plug-embedded-title" aria-describedby="plug-embedded-message">
      <div className="pwaInstallInfo" style={{...installShellStyle, position: "relative", left: "auto", right: "auto", bottom: "auto", width: "100%", maxWidth: 520, margin: 0}}>
        <div>
          <strong id="plug-embedded-title"><span aria-hidden="true">🌐 </span>OPEN ITERATION 14 IN YOUR BROWSER</strong>
          <span id="plug-embedded-message">{embeddedAndroid ? <>Open Iteration 14 in Chrome to continue.</> : <>Iteration 14 opened inside another app. Open this page in your browser to continue.</>}</span>
        </div>
        <div className="pwaInstallActions" style={{display:"flex",justifyContent:"flex-end"}}>
          <button ref={embeddedActionRef} type="button" style={{background:"#0866FF",color:"#fff"}} onClick={openBrowser}>{embeddedAndroid ? "OPEN IN CHROME" : "OPEN IN BROWSER"}</button>
        </div>
      </div>
    </div>
  ) : null;

  return <>
    {!environment().standalone && installState !== "embedded" && (canInstall || canShowManualInstall) && !installCardDismissed && !(installState === "native" && installHelpOpen) && (
      <>
      <aside className={"i13-install-card" + (installCardExpanded ? "" : " is-collapsed")} aria-label="Install BACKPACK OS">
        <div className="i13-install-brand">
          <span className="i13-install-mark" aria-hidden="true">14</span>
          <span><strong>ITERATION 14</strong><small>YOUR PERSONAL SPACE</small></span>
        </div>
        <div className="i13-install-controls"><button className="i13-install-collapse" type="button" aria-label={installCardExpanded ? "Collapse install card" : "Expand install card"} aria-expanded={installCardExpanded} onClick={() => setInstallCardExpanded(value => !value)}>{installCardExpanded ? "−" : "+"}</button><button className="i13-install-close" type="button" aria-label="Dismiss install prompt for seven days" onClick={dismissInstall}>×</button></div>
        {installCardExpanded && <button className="i13-install-action" type="button" onClick={() => {
          if (installPromptRef.current) {
            void install();
            return;
          }
          if (isIosSafari()) {
            setInstallHelpOpen(true);
            setInstallState("native");
          }
        }}>{canInstall ? "Install BACKPACK OS" : "Add Iteration 14 to Home Screen"} <span aria-hidden="true">↗</span></button>}
      </aside>
      <div className={"i13-install-spacer" + (installCardExpanded ? " is-expanded" : "")} aria-hidden="true" />
      </>
    )}
    {installCard}
    {updateReady && <div className="pwaUpdate" role="status" aria-live="polite" aria-atomic="true"><div><strong>Update ready</strong><span>Refresh to load the latest app shell.</span></div><div className="pwaUpdateActions"><button type="button" className="pwaUpdateDismiss" onClick={() => setUpdateReady(null)}>Later</button><button type="button" className="button buttonPrimary" onClick={applyUpdate}>Refresh</button></div></div>}
  </>;
}
