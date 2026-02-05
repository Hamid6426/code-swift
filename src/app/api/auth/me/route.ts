// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types/jwt.type";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) return NextResponse.json({ user: null });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return NextResponse.json({
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
