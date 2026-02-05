// src/app/chats/page.tsx
import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import ChatsPageClient from "@/components/ChatsPageClient";
import { User } from "@/types/user.type";

export default async function Page() {
  const sql = neon(process.env.DATABASE_URL!);
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return <div>Unauthorized</div>;

  // Extract current user ID from JWT token
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentUserId = payload.sub;

  // Fetch users from Neon
  const users = (await sql`
    SELECT id, name, email 
    FROM users 
    WHERE id != ${currentUserId}
  `) as User[];

  return <ChatsPageClient users={users} currentUserId={currentUserId} />;
}
