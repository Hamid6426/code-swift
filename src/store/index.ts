import { create } from "zustand";
import type { User } from "@/types/user.type";
import { api } from "@/lib/api";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
      set({ user: null });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },
}));
