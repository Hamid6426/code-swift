import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { sidebarMenuItems } from "@/lib/menuItems";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh flex bg-background text-on-background overflow-hidden">
      <Sidebar items={sidebarMenuItems} />
      <div className="flex-1 flex flex-col min-h-dvh overflow-y-auto">
        <Header />
        <div className="flex-1 ml-14 md:ml-0">{children}</div>
      </div>
    </div>
  );
}
