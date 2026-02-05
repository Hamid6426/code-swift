import FriendCard from "@/components/FriendCard";
import { userStats, callLogs, mockMails } from "@/lib/dashboardData";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 bg-background text-on-background">
      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Friends Section */}
        <div className="bg-surface p-4 rounded-md flex flex-col">
          <div className="text-on-surface font-bold text-2xl mb-4">Friends</div>
          <div className="flex flex-col gap-4">
            {userStats.slice(0, 3).map((user) => (
              <FriendCard key={user.id} user={user} />
            ))}
          </div>
          <Link
            href="/users"
            className="mt-4 text-center py-2 text-sm font-medium text-on-ghost bg-ghost hover:bg-ghost-hover border border-ghost-border rounded transition"
          >
            Show all
          </Link>
        </div>

        {/* Recent Messages Section */}
        <div className="bg-surface p-4 rounded-md flex flex-col border border-outline">
          <div className="text-on-surface font-bold text-2xl mb-4">Recent</div>
          <div className="flex flex-col gap-4">
            {mockMails.slice(0, 3).map((mail) => (
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
          <Link
            href="/mails"
            className="mt-4 text-center py-2 text-sm font-medium text-on-ghost bg-ghost hover:bg-ghost-hover border border-outline rounded transition"
          >
            Show all
          </Link>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-md flex flex-col">
        <div className="text-on-surface font-bold text-2xl mb-4">Call Logs</div>

        {/* Call Logs Table */}
        <div className="overflow-x-auto border border-outline rounded-md shadow-md bg-surface">
          <table className="min-w-full divide-y divide-outline">
            <thead className="bg-container">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  User
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  Duration
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-on-container">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-outline">
              {callLogs.slice(0, 3).map((log) => (
                <tr key={log.id} className="hover:bg-surface-hover transition">
                  <td className="px-4 py-2 text-on-surface">{log.user}</td>
                  <td className="px-4 py-2 capitalize text-on-surface">
                    {log.type}
                  </td>
                  <td className="px-4 py-2 text-on-surface">{log.duration}</td>
                  <td className="px-4 py-2 text-on-surface">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <Link
            href="/calls"
            className="px-4 py-2 text-sm font-medium text-on-ghost bg-ghost hover:bg-ghost-hover border border-ghost-border rounded-md transition"
          >
            Show all
          </Link>
        </div>
      </div>
    </div>
  );
}
