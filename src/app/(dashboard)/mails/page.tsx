import { mockMails } from "@/lib/dashboardData";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

export default function MailsPage() {
  return (
    <div className="p-4">
      <div className="bg-surface p-4 rounded-md flex flex-col border border-outline">
        <div className="text-on-surface font-bold text-2xl mb-4">Mails</div>
        <div className="flex flex-col gap-4">
          {mockMails.map((mail) => (
            <div
              key={mail.id}
              className="h-24 p-4 rounded-md bg-container hover:bg-container-hover border border-outline transition cursor-pointer group flex justify-between items-center"
              title={`From: ${mail.from}`}
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-on-container group-hover:text-primary transition-colors truncate">
                  {mail.subject}
                </h4>
                <p className="text-sm text-on-container/60 truncate">
                  {mail.from}
                </p>
                <p className="text-xs text-on-container/40 mt-1">
                  {new Date(mail.date).toLocaleDateString()}
                </p>
              </div>

              <Link
                href={`/mails/${mail.id}`}
                className="p-2 cursor-pointer rounded-md bg-surface hover:bg-surface-hover transition"
              >
                <ArrowBigRight className="w-5 h-5 text-on-surface" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
