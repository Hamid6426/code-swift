// src/components/Inbox.tsx
"use client";

import { ref, push, onValue, serverTimestamp } from "firebase/database";
import { db } from "@/lib/firebase";
import { useEffect, useState, useRef } from "react";
import { Message } from "@/types/message.type";
import { useCookieData } from "@/hooks/useCookieData";

export default function Inbox({
  friendId,
  currentUserId,
}: {
  friendId: number;
  currentUserId: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const userName = useCookieData() ?? "Me";
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatId = [currentUserId, friendId].sort().join("_");

  useEffect(() => {
    const messagesRef = ref(db, `chats/${chatId}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed: Message[] = Object.entries(data).map(
          ([key, value]): Message => ({
            id: key,
            ...(value as Omit<Message, "id">),
          }),
        );
        setMessages(parsed);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const handleSend = () => {
  //   if (!input.trim()) return;

  //   const messagesRef = ref(db, `chats/${chatId}`);
  //   push(messagesRef, {
  //     from: userName,
  //     subject: input,
  //     date: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     timestamp: serverTimestamp(),
  //   });

  //   setInput("");
  // };

  const handleSend = () => {
    if (!input.trim()) return;

    const messagesRef = ref(db, `chats/${chatId}`);
    push(messagesRef, {
      from: userName,
      senderId: currentUserId, // Add this
      subject: input,
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUserId; // Boolean check

          return (
            <div
              key={msg.id}
              className={`max-w-60 w-full p-2 rounded-lg shadow-sm text-sm ${
                isMe
                  ? "self-end bg-primary text-on-primary rounded-tr-none"
                  : "self-start bg-container text-on-container border border-container-border rounded-tl-none"
              }`}
            >
              <div className="wrap-break-word leading-relaxed">
                {msg.subject}
              </div>
              <div
                className={`text-[9px] mt-1 text-right font-medium ${isMe ? "text-on-primary/50" : "text-on-container/50"}`}
              >
                {msg.date}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} className="h-2 shrink-0" />
      </div>

      <div className="shrink-0 p-3 md:p-4 border-t border-outline bg-surface flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Message..."
          className="flex-1 border border-outline rounded-md px-4 py-2 bg-background text-on-background focus:ring-2 focus:ring-primary outline-none transition text-sm"
        />
        <button
          onClick={handleSend}
          className="px-4 md:px-6 py-2 bg-primary hover:bg-primary-hover text-on-primary rounded-md font-medium transition text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
