// src/app/mails/[id]/page.tsx (Updated for visual spacing)

import { notFound } from "next/navigation";
import Link from "next/link";
import { mockMails } from "@/lib/dashboardData";
import { ArrowBigLeft } from "lucide-react";

interface MailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MailPage({ params }: MailPageProps) {
  const { id } = await params;
  const mail = mockMails.find((m) => m.id === parseInt(id, 10));

  if (!mail) return notFound();

  return (
    <div className="p-6 bg-background min-h-screen flex flex-col gap-6">
      <Link
        href="/mails"
        className="text-sm text-primary hover:underline w-fit"
      >
        <ArrowBigLeft />
      </Link>

      <div className="bg-surface p-8 rounded-md border border-outline flex flex-col gap-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">
            {mail.subject}
          </h1>
          <div className="flex justify-between items-center text-sm text-on-surface/60">
            <span className="font-medium">From: {mail.from}</span>
            <span>{new Date(mail.date).toDateString()}</span>
          </div>
        </div>

        <hr className="border-outline" />

        <pre className="whitespace-pre-wrap text-on-surface font-sans leading-relaxed text-base">
          {mail.body}
        </pre>
      </div>
    </div>
  );
}
