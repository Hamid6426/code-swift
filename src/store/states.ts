import { User } from "@/types/user.type";

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
}
