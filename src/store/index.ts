import { create } from "zustand";
import type { User } from "@/types/user.type";
import { api } from "@/lib/api";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;

  logout: () => Promise<void>;
}

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      await api.post("/auth/logout");
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
