"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface AcademicSessionSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  includeAll?: boolean;
}

// Generate academic sessions - currently restricted to 2025/2026 only
function generateAcademicSessions(): string[] {
  // Only show current academic session: 2025/2026
  return ["2025/2026"];
}

export function AcademicSessionSelect({
  value,
  onValueChange,
  placeholder = "Select academic session",
  className,
  includeAll = false,
}: AcademicSessionSelectProps) {
  const sessions = useMemo(() => generateAcademicSessions(), []);

  // Determine current academic session
  const currentSession = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Academic year typically starts in September
    if (month >= 8) {
      return `${year}/${year + 1}`;
    } else {
      return `${year - 1}/${year}`;
    }
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value="all">All Sessions</SelectItem>}
        {sessions.map((session) => (
          <SelectItem key={session} value={session}>
            {session} {session === currentSession && "(Current)"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Helper function to get the current academic session
export function getCurrentAcademicSession(): string {
  // Current academic session is 2025/2026
  return "2025/2026";
}
