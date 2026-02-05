// src/components/sidebar/Sidebar.tsx
import Link from "next/link";
import { SidebarItem } from "@/types/sidebar.type";
import {
  Home,
  Users,
  Settings,
  LucideIcon,
  ListCollapseIcon,
} from "lucide-react";

interface Props {
  items: SidebarItem[];
}

export const iconMap: Record<string, LucideIcon> = {
  Home,
  Users,
  Settings,
};

export default function Sidebar({ items }: Props) {
  return (
    <aside className="h-dvh w-48 bg-surface border-r border-surface-border flex flex-col pb-2 px-2">
      <div className="flex items-center h-14 border-b border-surface-border pl-4 text-2xl font-bold">
        Dashboard
      </div>

      <nav className="flex flex-col gap-2">
        {items
          .sort((a, b) => a.orderSequence - b.orderSequence)
          .map((item) => (
            <SidebarNode key={item.id} item={item} />
          ))}
      </nav>

      <div
        className="mt-auto flex items-center gap-3 px-3 py-2
               text-on-surface
               hover:bg-container-hover
               active:bg-container-active
               border border-container-border
               hover:border-container-border-hover"
      >
        <ListCollapseIcon className="w-4 h-4" />
        <span>Collapse Menu</span>
      </div>
    </aside>
  );
}

function SidebarNode({ item }: { item: SidebarItem }) {
  const Icon = item.icon ? iconMap[item.icon] : null;

  return (
    <div className="gap-2">
      <Link
        href={item.link}
        className="flex items-center gap-3 px-3 py-2 rounded-md
                   text-on-surface
                   hover:bg-container-hover
                   active:bg-container-active
                   border border-container-border
                   hover:border-container-border-hover"
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{item.title}</span>
      </Link>
    </div>
  );
}
