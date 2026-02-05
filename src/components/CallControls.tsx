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
    <div className="flex flex-row flex-wrap md:flex-col w-full h-16 md:pt-0 justify-center items-center md:h-full md:w-16 md:pl-4 gap-2 md:gap-4 md:my-auto">
      {/* Start Call */}
      <Tooltip label="Start call">
        {iconBtn(
          <Phone className="size-4 md:size-6" />,
          "bg-primary text-color-on-primary",
          onStart,
          callStatus !== "idle",
        )}
      </Tooltip>

      {/* Mute / Unmute */}
      <Tooltip label={muted ? "Unmute" : "Mute"}>
        {iconBtn(
          muted ? (
            <MicOff className="size-4 md:size-6" />
          ) : (
            <Mic className="size-4 md:size-6" />
          ),
          muted
            ? "bg-error text-color-on-error"
            : "bg-success text-color-on-success",
          onMuteToggle,
          callStatus !== "connected",
        )}
      </Tooltip>

      {/* Video Toggle */}
      <Tooltip label={videoOn ? "Turn video off" : "Turn video on"}>
        {iconBtn(
          videoOn ? (
            <Video className="size-4 md:size-6" />
          ) : (
            <VideoOff className="size-4 md:size-6" />
          ),
          videoOn
            ? "bg-success text-color-on-success"
            : "bg-error text-color-on-error",
          onVideoToggle,
          callStatus !== "connected",
        )}
      </Tooltip>

      {/* End Call */}
      <Tooltip label="End call">
        {iconBtn(
          <X className="size-4 md:size-6" />,
          "bg-error text-color-on-error",
          onEnd,
          callStatus !== "connected",
        )}
      </Tooltip>

      {/* Reset */}
      <Tooltip label="Reset">
        {iconBtn(
          <RefreshCw className="size-4 md:size-6" />,
          "bg-primary text-color-on-primary",
          onReset,
          callStatus !== "ended",
        )}
      </Tooltip>
    </div>
  );
}

function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      {children}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2
        whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white
        opacity-0 group-hover:opacity-100 transition"
      >
        {label}
      </div>
    </div>
  );
}
