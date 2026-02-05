"use client";

import { X } from "lucide-react";

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendName: string;
}

export default function PhoneModal({
  isOpen,
  onClose,
  friendName,
}: PhoneModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-surface rounded-md p-6 w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-on-surface hover:text-red-500"
        >
          <X size={20} />
        </button>
        <h3 className="font-bold text-lg text-on-surface mb-4">
          Calling {friendName}
        </h3>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
            📞
          </div>
          <p className="text-sm text-on-surface/70">Call in progress...</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-error text-on-error rounded-md"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
}
