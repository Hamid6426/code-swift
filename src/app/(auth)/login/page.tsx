"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (field: "email" | "password", value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/auth/login", loginForm);
      toast.success("Login successful!");
      setLoginForm({ email: "", password: "" });
      router.push("/dashboard");
    } catch (err: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      toast.error("Sigin Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-surface border border-surface-border rounded-lg p-8 shadow-md"
      >
        <h2 className="text-2xl font-semibold text-primary text-center">
          Login
        </h2>

        <Input
          id="email"
          label="Email"
          type="email"
          value={loginForm.email}
          onChange={(val) => handleChange("email", val)}
          placeholder="you@example.com"
          required
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={loginForm.password}
          onChange={(val) => handleChange("password", val)}
          placeholder="••••••••"
          required
        />

        <Button type="submit" loading={loading}>
          Login
        </Button>

        <div className="mt-4 text-center text-on-surface">
          <span className="text-gray-500">Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up Here
          </Link>
        </div>
      </form>
    </div>
  );
}
