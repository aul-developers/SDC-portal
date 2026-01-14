import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationDropdownProps {
  isScrolled: boolean;
  hoverColor: string;
}

export function NotificationDropdown({
  isScrolled,
  hoverColor,
}: NotificationDropdownProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full",
        isScrolled ? "text-gray-500" : "text-blue-100",
        hoverColor
      )}
    >
      <Bell className="h-5 w-5" />
      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
        3
      </span>
      <span className="sr-only">Notifications</span>
    </Button>
  );
}
