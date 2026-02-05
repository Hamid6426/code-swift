"use client";

import { useState, useRef } from "react";
import VideoDisplay from "@/components/VideoDisplay";
import CallControls from "@/components/CallControls";
import CallStatus from "@/components/CallStatus";

type CallStatusType = "idle" | "ringing" | "connected" | "ended";

export default function VideoCallPage() {
  const [callStatus, setCallStatus] = useState<CallStatusType>("idle");
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [callTime, setCallTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Start call
  const startCall = () => {
    setCallStatus("ringing");
    setTimeout(() => {
      setCallStatus("connected");
      timerRef.current = window.setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    }, 2000);
  };

  // End call
  const endCall = () => {
    setCallStatus("ended");
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null; // reset
    }
  };

  // Reset call
  const resetCall = () => {
    setCallStatus("idle");
    setCallTime(0);
    setMuted(false);
    setVideoOn(true);
  };

  return (
    <div className="bg-background p-4 flex h-full">
      <div className="flex-1 flex flex-col md:flex-row bg-surface text-color-on-background p-4 w-full">
        <div className="flex-1 flex justify-center items-center">
          <VideoDisplay videoOn={videoOn} callStatus={callStatus} />
        </div>
        <CallControls
          callStatus={callStatus}
          muted={muted}
          videoOn={videoOn}
          onStart={startCall}
          onEnd={endCall}
          onMuteToggle={() => setMuted((prev) => !prev)}
          onVideoToggle={() => setVideoOn((prev) => !prev)}
          onReset={resetCall}
        />
      </div>
    </div>
  );
}
