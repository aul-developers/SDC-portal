import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
}

export function Logo({ collapsed }: LogoProps) {
  return (
    <div className="flex h-16 items-center px-4 border-b border-sdc-navy/20">
      <div
        className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center w-full"
        )}
      >
        <div className="relative h-9 w-9 overflow-hidden rounded-md bg-white">
          <Image
            src="/aul-abstract.png"
            alt="AUL Logo"
            fill
            className="object-cover"
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">SDC Portal</span>
            <span className="text-xs text-sdc-white/60">Admin Panel</span>
          </div>
        )}
      </div>
    </div>
  );
}
