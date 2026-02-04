"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

export default function SignUpPage() {
  const [signupForm, setSignupForm] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    field: "name" | "email" | "password",
    value: string,
  ) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/auth/signup", signupForm);

      toast.success("Registered successfully. Please login.");
      setSignupForm({ name: "", email: "", password: "" });
      router.push("/login");
    } catch (err: unknown) {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
      }
      toast.error("Signup Failed!");
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
          Sign Up
        </h2>

        <Input
          id="name"
          label="Name"
          type="text"
          value={signupForm.name}
          onChange={(val) => handleChange("name", val)}
          placeholder="Your name"
          required
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={signupForm.email}
          onChange={(val) => handleChange("email", val)}
          placeholder="you@example.com"
          required
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={signupForm.password}
          onChange={(val) => handleChange("password", val)}
          placeholder="••••••••"
          required
        />

        <Button type="submit" loading={loading}>
          Sign Up
        </Button>

        <div className="mt-4 text-center text-on-surface">
          <span className="text-gray-500">Already have an account? </span>
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login Here
          </Link>
        </div>
      </form>
    </div>
  );
}
