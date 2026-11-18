import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="po-entry">
      <header className="po-entry-brand">
        <span className="po-brand-mark">P</span>
        <span><strong>BACKPACK OS</strong><small>YOUR PERSONAL OPERATING SYSTEM</small></span>
      </header>
      <section className="po-entry-card">
        <span className="po-eyebrow">OFFLINE MODE</span>
        <h1>Your Backpack is still here.</h1>
        <p>The network is unavailable, but the app shell may still be available on this device.</p>
        <div style={{display:"grid",gap:12,marginTop:24}}>
          <p><strong>What works offline</strong><br />After BACKPACK OS has been opened successfully while online and its service worker has installed, you can reopen the cached app shell. My Life, My Channel, your setup and your locally saved records can work from this browser's local storage.</p>
          <p><strong>What needs a connection</strong><br />Loading a Backpack from a remote service, cloud sync, public publishing, external links, new remote uploads and streaming media need internet. Changes made offline stay on this device; they are not queued for cloud delivery.</p>
          <p><strong>Before you go offline</strong><br />Open BACKPACK OS once while connected and let it finish loading. The browser can clear cached files to free storage, and the first-ever visit cannot be made offline.</p>
        </div>
        <div className="po-entry-actions" style={{justifyContent:"flex-start",marginTop:24}}>
          <Link className="po-primary" href="/">Open BACKPACK OS →</Link>
        </div>
      </section>
      <p className="po-entry-foot">Your personal workspace · My Life + My Channel</p>
    </main>
  );
}
