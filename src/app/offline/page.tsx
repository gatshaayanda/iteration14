import PersonalChannelOS from "@/app/PersonalChannelOS";

export default function OfflinePage() {
  return (
    <>
      <div className="bp-offline-notice" role="status">
        <img src="/backpack-os-icon-v4.svg" alt="" width="36" height="36" />
        <strong>BACKPACK</strong>
        <span>You&apos;re offline. Your Backpack is available on this device. Uploads and external links need a connection.</span>
      </div>
      <PersonalChannelOS />
    </>
  );
}