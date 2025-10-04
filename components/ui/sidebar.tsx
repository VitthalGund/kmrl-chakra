"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Search,
  LineChart,
  Settings,
  Shield,
  Upload,
  LogOut,
  Users,
  BarChartBig,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/documents", icon: FileText, label: "Documents" },
    { href: "/search", icon: Search, label: "AI Search" },
    { href: "/upload", icon: Upload, label: "Upload" },
    { href: "/analytics", icon: LineChart, label: "My Analytics" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const adminNavItems = [
    { href: "/dashboard/admin", icon: BarChartBig, label: "Analytics" },
    { href: "/dashboard/admin/users", icon: Users, label: "User Management" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      <div className="mb-8 flex items-center gap-2">
        <img src="/kmrl-logo.jpg" alt="KMRL Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold">KMRL Chakra</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive(item.href) && !pathname.includes("/admin")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}

        {user?.role === "Admin" && (
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full"
          >
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname.includes("/admin")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="space-y-1 pl-6">
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-muted font-semibold text-foreground"
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </nav>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
