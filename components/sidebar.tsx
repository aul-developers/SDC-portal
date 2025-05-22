"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  FileText,
  Users,
  AlertTriangle,
  BookOpen,
  UserCog,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Update the navigation array to include the correct paths
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Case Management", href: "/dashboard/cases", icon: FileText },
  { name: "Student Records", href: "/dashboard/students", icon: Users },
  { name: "Punishment Tracker", href: "/dashboard/punishments", icon: AlertTriangle },
  { name: "Offence Directory", href: "/dashboard/offences", icon: BookOpen },
  { name: "User Management", href: "/dashboard/users", icon: UserCog },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-sdc-navy transition-all duration-300 relative",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sdc-navy shadow-md z-10"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className="flex h-16 items-center px-4 border-b border-sdc-navy/20">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <div className="relative h-9 w-9 overflow-hidden rounded-md bg-white">
            <Image src="/aul-abstract.png" alt="AUL Logo" fill className="object-cover" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">SDC Portal</span>
              <span className="text-xs text-sdc-white/60">Admin Panel</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          // Fix the isActive check to properly handle nested routes
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) && item.href !== "/dashboard") ||
            (item.href === "/dashboard" && pathname === "/dashboard")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                isActive ? "bg-sdc-blue text-white" : "text-gray-300 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center px-2",
              )}
            >
              <item.icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className={cn("border-t border-sdc-navy/20 p-4", collapsed ? "flex justify-center" : "")}>
        {!collapsed && (
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/10">
              <Image src="/diverse-user-avatars.png" alt="User Avatar" fill className="object-cover" />
            </div>
            <div>
              <p className="font-medium text-white">Dr. Sarah Johnson</p>
              <p className="text-xs text-gray-400">Committee Chair</p>
            </div>
          </div>
        )}
        <button
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors",
            collapsed && "justify-center",
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </div>
  )
}
