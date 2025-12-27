import Image from "next/image";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  collapsed?: boolean;
  onSignOut: () => void;
}

export function UserProfile({ collapsed, onSignOut }: UserProfileProps) {
  return (
    <div
      className={cn(
        "border-t border-sdc-navy/20 p-4",
        collapsed ? "flex justify-center" : ""
      )}
    >
      {!collapsed && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative h-10 w-10 flex items-center justify-center overflow-hidden rounded-full bg-sdc-blue text-white font-bold">
            {/* Simple initials fallback since this seems to be a static component or receives hardcoded props in some usages */}
            SJ
          </div>
          <div>
            <p className="font-medium text-white">Dr. Sarah Johnson</p>
            <p className="text-xs text-gray-400">Committee Chair</p>
          </div>
        </div>
      )}
      <button
        onClick={onSignOut}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors",
          collapsed && "justify-center"
        )}
      >
        <LogOut size={20} />
        {!collapsed && <span>Sign out</span>}
      </button>
    </div>
  );
}
