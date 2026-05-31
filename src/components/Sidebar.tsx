"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Activity, Settings, User, LogOut } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "/", label: "Dashboard", icon: LayoutDashboard },
  { id: "/courses", label: "Courses", icon: BookOpen },
  { id: "/activity", label: "Activity", icon: Activity },
  { id: "/profile", label: "Profile", icon: User },
  { id: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:sticky md:top-0 md:h-screen w-full md:w-20 lg:w-64 bg-card/80 backdrop-blur-md border-t md:border-t-0 md:border-r border-border p-4 flex md:flex-col justify-between">
      <div className="flex md:flex-col gap-2 md:gap-6 w-full md:w-auto overflow-x-auto md:overflow-visible no-scrollbar items-center md:items-stretch">
        
        <div className="hidden md:flex items-center gap-3 px-2 mb-4 lg:mb-8 text-accent">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-accent" />
          </div>
          <span className="font-bold text-lg hidden lg:block text-foreground">NovaLearn</span>
        </div>

        <ul className="flex md:flex-col gap-2 w-full">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.id;
            
            return (
              <li key={item.id} className="relative group">
                <Link
                  href={item.id}
                  className={clsx(
                    "relative flex items-center gap-3 w-full p-3 rounded-xl transition-colors duration-200 outline-none",
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  )}
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-center md:justify-start w-full gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="hidden lg:block font-medium">{item.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button className="hidden md:flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/5 w-full">
        <LogOut className="w-5 h-5 shrink-0" />
        <span className="hidden lg:block font-medium">Log out</span>
      </button>
    </nav>
  );
}
