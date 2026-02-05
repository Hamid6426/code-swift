import { userStats, callLogs, messages } from "@/lib/dashboardData";
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
              <div
                key={user.id}
                className="h-24 p-4 rounded-md shadow-md bg-container hover:bg-container-hover border border-container-border transition cursor-pointer"
                title={`Email: ${user.email}`}
              >
                <h4 className="font-semibold text-on-container">{user.name}</h4>
                <p className="text-sm text-on-container/50">{user.email}</p>
                <p className="text-sm text-on-container/70">
                  Status: {user.status}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/friends"
            className="mt-4 text-center py-2 text-sm font-medium text-on-ghost bg-ghost hover:bg-ghost-hover border border-ghost-border rounded transition"
          >
            Show all
          </Link>
        </div>

        {/* Recent Messages Section */}
        <div className="bg-surface p-4 rounded-md flex flex-col">
          <div className="text-on-surface font-bold text-2xl mb-4">Recent</div>
          <div className="flex flex-col gap-4">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="h-24 p-4 rounded-md shadow-md bg-container hover:bg-container-hover border border-container-border transition cursor-pointer"
                title={`From: ${msg.from}`}
              >
                <h4 className="font-semibold text-on-container">
                  {msg.subject}
                </h4>
                <p className="text-sm text-on-container/50">{msg.from}</p>
                <p className="text-sm text-on-container/70">{msg.date}</p>
              </div>
            ))}
          </div>
          <Link
            href="/messages"
            className="mt-4 text-center py-2 text-sm font-medium text-on-ghost bg-ghost hover:bg-ghost-hover border border-ghost-border rounded transition"
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
