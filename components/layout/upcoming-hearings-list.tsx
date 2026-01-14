import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  name: string;
  id: string;
  image: string;
}

interface Hearing {
  id: string;
  student: Student;
  caseId: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface UpcomingHearingsListProps {
  hearings: Hearing[];
}

export function UpcomingHearingsList({ hearings }: UpcomingHearingsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sdc-dark">This Week</h3>
      {hearings.map((hearing) => (
        <div
          key={hearing.id}
          className="overflow-hidden rounded-lg border bg-white shadow-sm"
        >
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={hearing.student.image || "/placeholder.svg"}
                    alt={hearing.student.name}
                  />
                  <AvatarFallback>
                    {hearing.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">
                    {hearing.student.name}
                  </h4>
                  <p className="text-xs text-sdc-muted">
                    Case #{hearing.caseId}
                  </p>
                </div>
              </div>
              <Badge
                className={cn(
                  "px-2 py-0.5 text-[10px] uppercase",
                  hearing.status === "today" && "bg-sdc-danger",
                  hearing.status === "tomorrow" && "bg-sdc-warning"
                )}
              >
                {hearing.status}
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-sdc-muted">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(hearing.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sdc-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {hearing.time} - {hearing.location}
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 flex-1 text-xs"
              >
                Details
              </Button>
              <Button
                size="sm"
                className="h-7 flex-1 bg-sdc-primary text-xs text-white hover:bg-sdc-primary/90"
              >
                Prepare
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="mt-2 w-full text-xs">
        View All Hearings
      </Button>
    </div>
  );
}
