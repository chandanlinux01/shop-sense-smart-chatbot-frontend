"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  Sparkles,
  PlugZap,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "../ui/Button";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { user } = useUserStore()
  if (user?.pricing_plan === "free" || !user) {
    return null
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      title: "Chatbot Appearance",
      href: "/customize-bot",
      icon: Bot,
      active: pathname === "/customize-bot",
    },
    {
      title: "Product Recommendations",
      href: "/recommendations",
      icon: Sparkles,
      active: pathname === "/recommendations",
    },
    {
      title: "API Integrations",
      href: "/integrations",
      icon: PlugZap,
      active: pathname === "/integrations",
    },
    {
      title: "Conversations",
      href: "/conversations",
      icon: MessageSquare,
      active: pathname === "/conversations",
    },
    {
      title: "Billing",
      href: "/pricing-plans",
      icon: CreditCard,
      active: pathname === "/pricing-plans",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-card h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-2">
        <div className={cn(
          "flex items-center w-full gap-2",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
            }}
            variant="secondary"
            shape="circle"
            size="sm"
            className="shrink-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2 font-semibold overflow-hidden">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/images/shop_sense_logo.png"
                  alt="ShopSense Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl whitespace-nowrap">ShopSense AI</span>
            </Link>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                item.active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
          <Link
            href="/logout"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive",
              "text-muted-foreground",
              isCollapsed && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </nav>
      </div>
    </div>
  );
}
