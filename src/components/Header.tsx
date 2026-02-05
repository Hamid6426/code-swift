"use client";

import { LogOut, Menu } from "lucide-react";
import { useAuthStore } from "@/store";
import { useUIStore } from "@/store";
import { useRouter } from "next/navigation";

export default function Header() {
  const logout = useAuthStore((s) => s.logout);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const router = useRouter();


  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 right-0 px-2 w-full h-14 bg-surface border-b border-surface-border flex items-center justify-between">
      <button
        type="button"
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-container-hover"
      >
        <Menu size={20} />
      </button>
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex cursor-pointer bg-error text-on-error px-4 py-2 rounded-md shadow-sm hover:bg-error-hover focus:ring-2 focus:ring-error-border transition disabled:opacity-70 disabled:cursor-not-allowed"
    >
        <LogOut size={20} />
    </button>
    </header>
  );
}
