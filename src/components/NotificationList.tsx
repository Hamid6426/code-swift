// src/app/dashboard/notifications/NotificationList.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Info, CheckCircle, AlertCircle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  type: "info" | "success" | "error";
  createdAt: string;
}

const typeStyles: Record<
  string,
  { colorClass: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  info: { colorClass: "text-info", Icon: Info },
  success: { colorClass: "text-success", Icon: CheckCircle },
  error: { colorClass: "text-error", Icon: AlertCircle },
};

function Skeleton() {
  return (
    <div className="p-3 rounded-md border border-outline bg-container/50 animate-pulse flex justify-between items-center">
      <div className="flex items-center gap-4 w-full">
        <div className="w-5 h-5 bg-outline rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-outline rounded w-3/4" />
          <div className="h-3 bg-outline rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default function NotificationList({
  initialNotifications,
  searchTerm,
}: {
  initialNotifications: Notification[];
  searchTerm: string;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const res = await fetch(
        `/api/notifications?search=${searchTerm}&page=${nextPage}`,
      );
      const data = await res.json();

      if (data.notifications.length === 0) {
        setHasMore(false);
      } else {
        setNotifications((prev) => [...prev, ...data.notifications]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, page, loading, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, loading, hasMore, loadMore]);

  return (
    <div className="flex flex-col gap-3">
      {notifications.map((n, index) => {
        const { colorClass, Icon } = typeStyles[n.type];
        return (
          <div
            key={`${n.id}-${index}`}
            className="p-3 rounded-md border border-outline bg-surface flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <Icon className={`${colorClass} w-5 h-5`} />
              <div>
                <p className="font-semibold text-on-surface">{n.title}</p>
                <p
                  className="text-sm text-on-surface/70"
                  suppressHydrationWarning
                >
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex flex-col gap-3">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      <div ref={observerTarget} className="h-4 w-full" />

      {!hasMore && notifications.length > 0 && (
        <div className="text-center text-on-background/50 text-sm py-4">
          No more notifications to load.
        </div>
      )}
    </div>
  );
}
