// src/components/sidebar/sidebar-data.tsx
import { SidebarItem } from "@/types/sidebar.type";
import {
  Home,
  Users,
  Settings,
  LucideIcon,
  MessageCircleMore,
  Video,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Home,
  Users,
  Settings,
  MessageCircleMore,
  Video,
};

export const sidebarMenuItems: SidebarItem[] = [
  {
    id: 1,
    orderSequence: 1,
    title: "Dashboard",
    link: "/dashboard",
    icon: "Home",
  },
  {
    id: 2,
    orderSequence: 2,
    title: "Users",
    link: "/users",
    icon: "Users",
  },
  {
    id: 3,
    orderSequence: 3,
    title: "Chats",
    link: "/chats",
    icon: "MessageCircleMore",
  },
  {
    id: 4,
    orderSequence: 4,
    title: "Video Call",
    link: "/video-call",
    icon: "Video",
  },
];
