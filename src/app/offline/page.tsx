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
          <p><strong>What works offline</strong><br />After BACKPACK OS has been opened successfully while online and its service worker has installed, you can reopen the cached app shell. My Life, My Channel, your setup and your locally saved records can work from this browser&apos;s local storage.</p>
          <p><strong>What needs a connection</strong><br />Cloud confirmation, public publishing, external links, new remote uploads and streaming media need internet. After this browser has connected to your private cloud Backpack once, record changes made offline are queued locally and sent when the connection returns. Profile and engagement files remain on this device until file hosting is connected.</p>
          <p><strong>Before you go offline</strong><br />Open BACKPACK OS once while connected and let it finish connecting to cloud. If the workspace shows Local only or Needs attention, changes are not yet queued for cloud delivery. The browser can clear cached files to free storage, and the first-ever visit cannot be made offline.</p>
        </div>
        <div className="po-entry-actions" style={{justifyContent:"flex-start",marginTop:24}}>
          <Link className="po-primary" href="/">Open BACKPACK OS →</Link>
        </div>
      </section>
      <p className="po-entry-foot">Your personal workspace · My Life + My Channel</p>
    </main>
  );
}
