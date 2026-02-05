// src/components/sidebar/sidebar-data.tsx
import { SidebarItem } from "@/types/sidebar.type";

export const sidebarMenuItems: SidebarItem[] = [
  {
    id: "dashboard",
    orderSequence: 1,
    title: "Dashboard",
    link: "/dashboard",
    icon: "Home",
  },
  {
    id: "users",
    orderSequence: 2,
    title: "Users",
    link: "/users",
    icon: "Users",
  },
  {
    id: "settings",
    orderSequence: 3,
    title: "Settings",
    link: "/settings",
    icon: "Settings",
  },
];
