"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const baseClasses =
    "w-full border border-outline rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-hover transition";

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col mb-4 relative ${className}`}>
      <label htmlFor={id} className="mb-1 font-medium text-on-surface">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} resize-none h-24`}
        />
      ) : (
        <div className="relative">
          <input
            id={id}
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={`${baseClasses} pr-10`} // space for icon
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
