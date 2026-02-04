"use client";

import { ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};

import Loader from "./Loader";

export default function Button({
  type = "button",
  children,
  onClick,
  loading = false,
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center justify-center bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-primary-hover focus:ring-2 focus:ring-primary-border transition disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
}
