import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState, UIState } from "@/store/states";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      set({ user: null });
    }
  },
}));

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      collapseSidebar: () => set({ sidebarCollapsed: true }),
    }),
    {
      name: "ui-store", // localStorage key
      storage: createJSONStorage(() => localStorage), // default is localStorage
    },
  ),
);
