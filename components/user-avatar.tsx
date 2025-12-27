"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  className?: string;
}

export function UserAvatar({ name, avatarUrl, className }: UserAvatarProps) {
  // Generate initials: First Letter of First Name + First Letter of Last Name
  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    const names = fullName.split(" ").filter((n) => n.length > 0);

    if (names.length === 0) return "U";
    if (names.length === 1) {
      // If only one name, take first two letters or just first if length 1
      return names[0].substring(0, 2).toUpperCase();
    }

    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  // Custom fallback style to match the requested look
  // Dark background (like standard SDC navy or similar) with White text

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatarUrl || ""} alt={name} className="object-cover" />
      <AvatarFallback className="bg-[#242055] text-white font-bold flex items-center justify-center text-sm w-full h-full">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
