// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { SidebarItem } from "@/types/sidebar.type";
import { ListCollapseIcon } from "lucide-react";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { iconMap } from "@/lib/menuItems";

interface Props {
  items: SidebarItem[];
}

export default function Sidebar({ items }: Props) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={clsx(
        "fixed md:sticky top-0 left-0 h-dvh bg-surface border-r border-outline flex flex-col pb-2 px-2 transition-all duration-200",
        sidebarCollapsed ? "w-14" : "w-48",
      )}
    >
      <div className="flex items-center h-14 text-xl font-black overflow-hidden">
        {!sidebarCollapsed ? (
          <div className="text-primary text-center w-full">Code Swift</div>
        ) : (
          <div className="text-primary relative flex flex-col items-center w-full">CS</div>
        )}
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
                   border border-outline rounded-md transition-colors"
      >
        <ListCollapseIcon
          className={clsx(
            "w-4 h-4 transition-transform",
            !sidebarCollapsed && "rotate-180",
          )}
        />
        {!sidebarCollapsed && (
          <span className="whitespace-nowrap">Collapse Menu</span>
        )}
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
                 border border-outline transition-colors"
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {!collapsed && <span className="whitespace-nowrap">{item.title}</span>}
    </Link>
  );
}
