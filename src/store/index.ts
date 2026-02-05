import { create } from "zustand";
import type { User } from "@/types/user.type";
import { api } from "@/lib/api";

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

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  collapseSidebar: () => set({ sidebarCollapsed: true }),
}));
