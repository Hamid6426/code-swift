"use client";

import Link from "next/link";
import { SidebarItem } from "@/types/sidebar.type";
import {
  Home,
  Users,
  Settings,
  LucideIcon,
  ListCollapseIcon,
} from "lucide-react";
import { useUIStore } from "@/store";
import clsx from "clsx";

interface Props {
  items: SidebarItem[];
}

export const iconMap: Record<string, LucideIcon> = {
  Home,
  Users,
  Settings,
};

export default function Sidebar({ items }: Props) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={clsx(
        "h-dvh bg-surface border-r border-surface-border flex flex-col pb-2 px-2 transition-all duration-200",
        sidebarCollapsed ? "w-14" : "w-48"
      )}
    >
      <div className="flex items-center h-14 border-b border-surface-border px-3 text-xl font-bold">
        {!sidebarCollapsed ? <div className="relative flex">
          <div className="text-primary">Code&nbsp;&nbsp;</div>
          <div className="text-success ">Swift</div>
          </div> : <div className="relative">
          <div className="text-primary translate-y-4 -translate-x-1 text-3xl">C</div>
          <div className="text-success -translate-y-2 translate-x-2 text-3xl">S</div>
          </div>}
      </div>

      <nav className="flex flex-col gap-2 mt-2">
        {items
          .sort((a, b) => a.orderSequence - b.orderSequence)
          .map((item) => (
            <SidebarNode
              key={item.id}
              item={item}
              collapsed={sidebarCollapsed}
            />
          ))}
      </nav>

      <button
        onClick={toggleSidebar}
        className="mt-auto flex items-center gap-3 px-3 py-2
                   text-on-surface
                   hover:bg-container-hover
                   border border-container-border rounded-md"
      >
        <ListCollapseIcon className="w-4 h-4" />
        {!sidebarCollapsed && <span>Collapse Menu</span>}
      </button>
    </aside>
  );
}

function SidebarNode({
  item,
  collapsed,
}: {
  item: SidebarItem;
  collapsed: boolean;
}) {
  const Icon = item.icon ? iconMap[item.icon] : null;

  return (
    <Link
      href={item.link}
      className="flex items-center gap-3 px-3 py-2 rounded-md
                 text-on-surface
                 hover:bg-container-hover
                 border border-container-border"
    >
      {Icon && <Icon className="h-4 w-4" />}
      {!collapsed && <span>{item.title}</span>}
    </Link>
  );
}
