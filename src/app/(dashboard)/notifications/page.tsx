// src/app/dashboard/notifications/page.tsx
import { Search, Info, CheckCircle, AlertCircle } from "lucide-react";

interface PostDTO {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Notification {
  id: number;
  title: string;
  type: "info" | "success" | "error";
  createdAt: string;
}

interface NotificationsPageProps {
  searchParams: { search?: string; page?: string };
}

async function fetchNotifications(
  searchTerm = "",
  page = 1,
  pageSize = 10,
): Promise<{ notifications: Notification[]; total: number }> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch notifications");

    const data = await res.json();

    const notifications: Notification[] = (data as PostDTO[]).map(
      (item, index) => ({
        id: item.id,
        title: item.title,
        type: ["info", "success", "error"][index % 3] as
          | "info"
          | "success"
          | "error",
        createdAt: new Date(Date.now() - index * 3600 * 1000).toISOString(),
      }),
    );

    const filtered = searchTerm
      ? notifications.filter((n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : notifications;

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return { notifications: paginated, total: filtered.length };
  } catch (error) {
    console.error(error);
    return { notifications: [], total: 0 };
  }
}

export default async function NotificationsPage({
  searchParams,
}: NotificationsPageProps) {
  const { search = "", page = "1" } = searchParams;
  const pageNumber = parseInt(page, 10);
  const pageSize = 10;

  const { notifications, total } = await fetchNotifications(
    search,
    pageNumber,
    pageSize,
  );

  const typeStyles: Record<
    string,
    { colorClass: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
  > = {
    info: { colorClass: "text-info", Icon: Info },
    success: { colorClass: "text-success", Icon: CheckCircle },
    error: { colorClass: "text-error", Icon: AlertCircle },
  };

  return (
    <div className="p-4 bg-background min-h-screen rounded-md">
      <div className="p-4">
        <form method="get" className="mb-4 flex gap-2">
          <input
            name="search"
            type="text"
            defaultValue={search}
            placeholder="Search notifications..."
            className="border p-2 w-full rounded-md bg-container text-on-container"
          />
          <button
            type="submit"
            className="px-4 py-2 border rounded-md bg-primary text-on-primary"
          >
            <Search />
          </button>
        </form>

        {notifications.length === 0 ? (
          <div className="text-center text-on-background py-8">
            {search ? "No notifications found." : "Loading notifications..."}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((n) => {
              const { colorClass, Icon } = typeStyles[n.type];
              return (
                <div
                  key={n.id}
                  className={`p-3 rounded-md border flex justify-between items-center border-on-background bg-outline`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`${colorClass} w-5 h-5`} />
                    <div>
                      <p className={`font-semibold ${colorClass}`}>{n.title}</p>
                      <p className="text-sm text-on-background/70">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 text-on-background">
          Total notifications: {total}
        </div>
      </div>
    </div>
  );
}
