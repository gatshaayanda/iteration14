import PersonalChannelOS from "@/app/PersonalChannelOS";

export default function OfflinePage() {
  return (
    <>
      <div className="bp-offline-notice" role="status">
        <span aria-hidden="true">●</span>
        <strong>OFFLINE MODE</strong>
        <span>Your Backpack is available on this device. Uploads and external links need a connection.</span>
      </div>
      <PersonalChannelOS />
    </>
  );
}
