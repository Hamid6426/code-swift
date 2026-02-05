import {
  Phone,
  Mic,
  MicOff,
  Video,
  VideoOff,
  X,
  RefreshCw,
} from "lucide-react";

interface CallControlsProps {
  callStatus: "idle" | "ringing" | "connected" | "ended";
  muted: boolean;
  videoOn: boolean;
  onStart: () => void;
  onEnd: () => void;
  onMuteToggle: () => void;
  onVideoToggle: () => void;
  onReset: () => void;
}

export default function CallControls({
  callStatus,
  muted,
  videoOn,
  onStart,
  onEnd,
  onMuteToggle,
  onVideoToggle,
  onReset,
}: CallControlsProps) {
  const iconBtn = (
    children: React.ReactNode,
    colorClasses: string,
    onClick: () => void,
    disabled: boolean = false,
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-full transition 
        ${colorClasses} 
        ${disabled ? "bg-outline text-color-outline cursor-not-allowed hover:brightness-100" : "hover:brightness-110"}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-row md:flex-col w-full h-16 md:pt-0 justify-center items-center md:h-full md:w-16 md:pl-4 gap-4 md:my-auto">
      {/* Start Call */}
      {iconBtn(
        <Phone size={24} />,
        "bg-primary text-color-on-primary",
        onStart,
        callStatus !== "idle",
      )}

      {/* Mute/Unmute */}
      {iconBtn(
        muted ? <MicOff size={24} /> : <Mic size={24} />,
        muted
          ? "bg-error text-color-on-error"
          : "bg-success text-color-on-success",
        onMuteToggle,
        callStatus !== "connected",
      )}

      {/* Video Toggle */}
      {iconBtn(
        videoOn ? <Video size={24} /> : <VideoOff size={24} />,
        videoOn
          ? "bg-success text-color-on-success"
          : "bg-error text-color-on-error",
        onVideoToggle,
        callStatus !== "connected",
      )}

      {/* End Call */}
      {iconBtn(
        <X size={24} />,
        "bg-error text-color-on-error",
        onEnd,
        callStatus !== "connected",
      )}

      {/* Reset */}
      {iconBtn(
        <RefreshCw size={24} />,
        "bg-primary text-color-on-primary",
        onReset,
        callStatus !== "ended",
      )}
    </div>
  );
}
