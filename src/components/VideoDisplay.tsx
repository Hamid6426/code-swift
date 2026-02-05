import { PhoneCall, PhoneOff, Video, VideoOff } from "lucide-react";

interface VideoDisplayProps {
  callTime: number;
  videoOn: boolean;
  callStatus: "idle" | "ringing" | "connected" | "ended";
}

export default function VideoDisplay({
  callTime,
  videoOn,
  callStatus,
}: VideoDisplayProps) {
  const minutes = Math.floor(callTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (callTime % 60).toString().padStart(2, "0");

  return (
    <div className="relative w-full max-w-3xl aspect-video bg-color-surface border-2 border-color-surface-border rounded-2xl flex items-center justify-center">
      {callStatus === "idle" && (
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <Video className="text-on-surface size-8 md:size-12" />
          <p className="text-color-on-surface">Call not started</p>
        </div>
      )}

      {callStatus === "ringing" && (
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <PhoneCall className="text-on-surface size-8 md:size-12" />
          <p className="text-color-on-surface">Ringing...</p>
        </div>
      )}

      {callStatus === "connected" && (
        <>
          <div className="w-full h-full flex items-center justify-center rounded-lg bg-black/70 relative">
            {videoOn ? (
              <Video className="size-12 md:size-20 text-white/80" />
            ) : (
              <VideoOff className="size-12 md:size-20 text-white/80" />
            )}

            <div className="absolute top-3 left-3 text-xs bg-green-600/90 text-white px-2 py-0.5 rounded">
              Connected, it’s working
            </div>
          </div>

          <div className="absolute bottom-2 left-2 text-xs font-mono text-white bg-black/50 px-2 py-0.5 rounded">
            {minutes}:{seconds}
          </div>
        </>
      )}

      {callStatus === "ended" && (
        <div className="flex flex-col items-center gap-2 text-color-on-surface">
          <PhoneOff className="size-10 md:size-12" />
          <p className="text-sm">Call Ended</p>
        </div>
      )}
    </div>
  );
}
