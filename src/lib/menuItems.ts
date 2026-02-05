// src/components/sidebar/sidebar-data.tsx
import { SidebarItem } from "@/types/sidebar.type";
import {
  Home,
  Users,
  Settings,
  LucideIcon,
  MessageCircleMore,
  Video,
  Bell,
  Mail,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Home,
  Users,
  Settings,
  MessageCircleMore,
  Video,
  Bell,
  Mail,
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
  {
    id: 5,
    orderSequence: 5,
    title: "Notifications",
    link: "/notifications",
    icon: "Bell",
  },
  {
    id: 6,
    orderSequence: 6,
    title: "Mails",
    link: "/mails",
    icon: "Mail",
  },
];
