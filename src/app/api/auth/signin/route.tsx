// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const users = await sql`
    SELECT id, name, email, password
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  if (users.length === 0) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const user = users[0];

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const res = NextResponse.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });

  res.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
