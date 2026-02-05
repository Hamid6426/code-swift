import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set({
    name: "auth_token",
    value: "",
    path: "/",
    expires: new Date(0), // expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
