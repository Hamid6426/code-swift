import ViewToggle from "@/components/ViewToggle";
import type { User } from "@/types/user.type";
import { sql } from "@/lib/db";
import { Search } from "lucide-react";

interface UsersPageProps {
  searchParams: { search?: string; page?: string };
}

async function fetchUsers(
  searchTerm = "",
  page = 1,
  pageSize = 12,
): Promise<{ users: User[]; total: number }> {
  const offset = (page - 1) * pageSize;
  const term = searchTerm.trim();

  const rows =
    term.length > 0
      ? await sql`
          SELECT id, name, email, created_at
          FROM users
          WHERE name ILIKE ${"%" + term + "%"} OR email ILIKE ${"%" + term + "%"}
          ORDER BY created_at DESC
          LIMIT ${pageSize}
          OFFSET ${offset}
        `
      : await sql`
          SELECT id, name, email, created_at
          FROM users
          ORDER BY created_at DESC
          LIMIT ${pageSize}
          OFFSET ${offset}
        `;

  const countResult =
    term.length > 0
      ? await sql`
          SELECT COUNT(*)::int AS total
          FROM users
          WHERE name ILIKE ${"%" + term + "%"} OR email ILIKE ${"%" + term + "%"}
        `
      : await sql`SELECT COUNT(*)::int AS total FROM users`;

  const users: User[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at.toISOString(),
  }));

  return { users, total: countResult[0]?.total ?? 0 };
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { search = "", page = "1" } = await searchParams;
  const pageNumber = parseInt(page, 10);
  const pageSize = 12;

  const { users, total } = await fetchUsers(search, pageNumber, pageSize);

  return (
    <div className="p-4 bg-background min-h-screen rounded-md">
      <form method="get" className="mb-4 flex gap-2">
        <input
          name="search"
          type="text"
          defaultValue={search}
          placeholder="Search users..."
          className="border p-2 w-full rounded-md bg-container text-on-container"
        />
        <button
          type="submit"
          className="px-4 py-2 border rounded-md bg-primary text-on-primary"
        >
          <Search />
        </button>
      </form>

      <ViewToggle
        users={users}
        search={search}
        pageNumber={pageNumber}
        pageSize={pageSize}
        total={total}
      />
    </div>
  );
}
