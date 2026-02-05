// src/app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";

interface PostDTO {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: PostDTO[] = await res.json();

  const notifications = data.map((item, index) => ({
    id: item.id,
    title: item.title,
    type: ["info", "success", "error"][index % 3],
    createdAt: new Date(Date.now() - index * 3600 * 1000).toISOString(),
  }));

  const filtered = searchTerm
    ? notifications.filter((n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : notifications;

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({ notifications: paginated });
}
