import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { sidebarMenuItems } from "@/lib/menuItems";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh flex bg-background text-on-background">
      <Sidebar items={sidebarMenuItems} />
      <div className="flex-1 flex flex-col min-h-dvh">
        <Header />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
