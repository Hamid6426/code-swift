import Image from "next/image";

interface VideoDisplayProps {
  videoOn: boolean;
  callStatus: "idle" | "ringing" | "connected" | "ended";
}

export default function VideoDisplay({
  videoOn,
  callStatus,
}: VideoDisplayProps) {
  const placeholderImage = "/video-placeholder.png"; // add your static image in public/
  const mutedImage = "/video-off.png"; // optional static image when video off

  return (
    <div className="w-full aspect-video bg-color-surface border border-color-surface-border rounded-lg mb-4 flex items-center justify-center">
      {callStatus === "idle" && (
        <p className="text-color-on-surface">Call not started</p>
      )}
      {callStatus === "ringing" && (
        <p className="text-color-on-surface">Ringing...</p>
      )}
      {callStatus === "connected" && (
        <Image
          width={1280}
          height={720}
          src={videoOn ? placeholderImage : mutedImage}
          alt="Video Stream"
          className="w-full h-full object-cover rounded-lg"
        />
      )}
      {callStatus === "ended" && (
        <p className="text-color-on-surface">Call Ended</p>
      )}
    </div>
  );
}
