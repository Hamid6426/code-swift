// src/app/dashboard/notifications/page.tsx
import { Search } from "lucide-react";
import NotificationList from "@/components/NotificationList";

interface PostDTO {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchNotifications(searchTerm = "") {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: PostDTO[] = await res.json();

  const notifications = data.map((item, index) => ({
    id: item.id,
    title: item.title,
    type: ["info", "success", "error"][index % 3] as
      | "info"
      | "success"
      | "error",
    createdAt: new Date(Date.now() - index * 3600 * 1000).toISOString(),
  }));

  const filtered = searchTerm
    ? notifications.filter((n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : notifications;

  return { notifications: filtered.slice(0, 10), total: filtered.length };
}

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const { notifications, total } = await fetchNotifications(search);

  return (
    <div className="p-4 bg-background min-h-screen rounded-md">
      <form method="get" className="mb-4 flex gap-2">
        <input
          name="search"
          type="text"
          defaultValue={search}
          placeholder="Search notifications..."
          className="border border-outline p-2 w-full rounded-md bg-container text-on-container placeholder:text-on-container/50 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary text-on-primary hover:bg-primary-hover transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      <NotificationList
        initialNotifications={notifications}
        searchTerm={search}
      />

      <div className="mt-4 text-on-background font-medium">
        Total results found: {total}
      </div>
    </div>
  );
}
