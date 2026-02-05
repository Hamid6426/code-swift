"use client";

import { useState, useRef, useEffect } from "react";
import VideoDisplay from "@/components/VideoDisplay";
import CallControls from "@/components/CallControls";
import { useAudioLevel } from "@/hooks/useAudioLevel";

type CallStatusType = "idle" | "ringing" | "connected" | "ended";

export default function VideoCallPage() {
  const [callStatus, setCallStatus] = useState<CallStatusType>("idle");
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [callTime, setCallTime] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const timerRef = useRef<number | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const audioLevel = useAudioLevel(localStream);

  const startMedia = async () => {
    if (localStreamRef.current) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    setLocalStream(stream);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  };

  const stopMedia = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    setLocalStream(null);
  };

  const startCall = async () => {
    setCallStatus("ringing");

    await startMedia();

    setTimeout(() => {
      setCallStatus("connected");
      timerRef.current = window.setInterval(
        () => setCallTime((t) => t + 1),
        1000,
      );
    }, 2000);
  };

  const endCall = () => {
    setCallStatus("ended");
    if (timerRef.current) clearInterval(timerRef.current);
    stopMedia();
  };

  const resetCall = () => {
    setCallStatus("idle");
    setCallTime(0);
    setMuted(false);
    setVideoOn(true);
  };

  // mute / unmute mic
  useEffect(() => {
    localStreamRef.current
      ?.getAudioTracks()
      .forEach((t) => (t.enabled = !muted));
  }, [muted]);

  // video on / off
  useEffect(() => {
    localStreamRef.current
      ?.getVideoTracks()
      .forEach((t) => (t.enabled = videoOn));
  }, [videoOn]);

  return (
    <div className="bg-background flex h-full">
      <div className="flex-1 flex flex-col md:flex-row bg-surface p-4">
        {/* Remote / main video */}
        <div className="flex-1 flex justify-center items-center relative">
          <VideoDisplay
            videoOn={videoOn}
            callStatus={callStatus}
            callTime={callTime}
          />

          <div className="absolute bottom-16 right-4">
            <div
              className="absolute inset-0 rounded-md"
              style={{
                transform: `scale(${1 + audioLevel / 300})`,
                opacity: audioLevel > 10 ? 0.6 : 0,
                background: "rgba(59,130,246,0.4)",
                transition: "transform 80ms linear, opacity 80ms linear",
              }}
            />
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="relative w-40 aspect-video rounded-md bg-black object-cover border"
            />
          </div>
        </div>

        <CallControls
          callStatus={callStatus}
          muted={muted}
          videoOn={videoOn}
          onStart={startCall}
          onEnd={endCall}
          onMuteToggle={() => setMuted((m) => !m)}
          onVideoToggle={() => setVideoOn((v) => !v)}
          onReset={resetCall}
        />
      </div>
    </div>
  );
}
