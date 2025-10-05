"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth-guard";
import { Toaster } from "@/components/ui/sonner";
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
  Menu,
  Bell,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the Sidebar component directly inside the layout
function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/dashboard", icon: Search, label: "AI Search" },
    { href: "/dashboard/documents", icon: FileText, label: "Documents" },
    { href: "/dashboard/upload", icon: Upload, label: "Upload" },
    { href: "/dashboard/analytics", icon: LineChart, label: "My Analytics" },
    { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  const adminNavItems = [
    { href: "/dashboard/admin", icon: BarChartBig, label: "Analytics" },
    { href: "/dashboard/admin/users", icon: Users, label: "Users" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-2">
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
            defaultValue={pathname.includes("/admin") ? "admin-panel" : ""}
            className="w-full"
          >
            <AccordionItem value="admin-panel" className="border-b-0">
              <AccordionTrigger
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:no-underline ${
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
      </div>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
        <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
          <div className="mb-8 flex items-center gap-2">
            <img src="/kmrl-logo.jpg" alt="KMRL Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold">KMRL Chakra</h1>
          </div>
          <SidebarNav />
        </aside>

        <div className="flex flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-background px-6 md:justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-4">
                <div className="mb-8 flex items-center gap-2">
                  <img
                    src="/kmrl-logo.jpg"
                    alt="KMRL Logo"
                    className="h-10 w-10"
                  />
                  <h1 className="text-xl font-bold">KMRL Chakra</h1>
                </div>
                <SidebarNav />
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.name || ""} />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <main className="flex-1 overflow-auto bg-muted/40">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
      <Toaster />
    </AuthProvider>
  );
}
