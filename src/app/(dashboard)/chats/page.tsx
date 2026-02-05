"use client";

import { useState } from "react";
import Inbox from "@/components/Inbox";
import { userStats } from "@/lib/dashboardData";
import Link from "next/link";
import Image from "next/image";
import { CircleChevronLeft } from "lucide-react";

export default function ChatsPage() {
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [showChatMobile, setShowChatMobile] = useState(false);

  const activeFriend = userStats.find((f) => f.id === selectedFriendId);

  const handleSelectFriend = (id: number) => {
    setSelectedFriendId(id);
    setShowChatMobile(true);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] gap-4 p-4 bg-background text-on-background overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 flex flex-col gap-4 bg-surface p-4 rounded-md border border-outline overflow-y-auto ${
          showChatMobile ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="text-on-surface font-bold text-2xl mb-2">Friends</div>
        <div className="flex flex-col gap-3">
          {userStats.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectFriend(user.id)}
              className={`flex flex-col p-4 rounded-md shadow-sm border cursor-pointer transition text-left ${
                selectedFriendId === user.id
                  ? "bg-primary/10 border-primary"
                  : "bg-container hover:bg-container-hover border-container-border"
              }`}
            >
              <h4
                className={`font-semibold ${
                  selectedFriendId === user.id
                    ? "text-primary"
                    : "text-on-container"
                }`}
              >
                {user.name}
              </h4>
              <p className="text-xs text-on-container/50 truncate">
                {user.email}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Inbox / placeholder */}
      <div
        className={`flex-1 flex flex-col bg-surface rounded-md border border-outline overflow-hidden ${
          !showChatMobile ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedFriendId ? (
          <>
            <div className="p-4 border-b border-outline bg-container/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {/* Chevron only visible on mobile */}
                <button
                  onClick={() => setShowChatMobile(false)}
                  className="md:hidden p-1 -ml-1 hover:bg-container-hover rounded-full text-on-surface"
                >
                  <CircleChevronLeft className="text-primary" />
                </button>
                <div className="flex flex-col">
                  <div className="font-bold text-on-surface text-lg leading-tight">
                    {activeFriend?.name}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-on-surface/50 font-bold">
                    {activeFriend?.status}
                  </span>
                </div>
              </div>
            </div>

            <Inbox friendId={selectedFriendId} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-on-container/50">
            <div className="text-center">
              <Image
                width={400}
                height={400}
                src="/placeholder-chat.svg"
                alt="Select a friend"
                className="mx-auto mb-4 w-24 h-24"
              />
              <p className="text-sm">Select a friend to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
