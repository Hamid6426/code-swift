// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser =
      await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

    await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
