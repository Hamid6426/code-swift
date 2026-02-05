"use client";

import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import PhoneModal from "./PhoneModal"; // path as needed
import { userStats } from "@/lib/dashboardData";

export default function FriendCard({ user }: { user: (typeof userStats)[0] }) {
  const [phoneOpen, setPhoneOpen] = useState(false);

  return (
    <>
      <div className="h-24 p-4 rounded-md shadow-md bg-container hover:bg-container-hover border border-container-border transition cursor-pointer flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-on-container">{user.name}</h4>
          <p className="text-sm text-on-container/50">{user.email}</p>
          <p className="text-sm text-on-container/70">Status: {user.status}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPhoneOpen(true)}
            className="p-2 cursor-pointer rounded-md bg-surface hover:bg-surface-hover transition"
            title="Call"
          >
            <Phone className="w-5 h-5 text-on-surface" />
          </button>

          <Link
            href="/chats"
            className="p-2 cursor-pointer rounded-md bg-surface hover:bg-surface-hover transition"
            title="Chat"
          >
            <MessageCircle className="w-5 h-5 text-on-surface" />
          </Link>
        </div>
      </div>

      <PhoneModal
        isOpen={phoneOpen}
        onClose={() => setPhoneOpen(false)}
        friendName={user.name}
      />
    </>
  );
}
