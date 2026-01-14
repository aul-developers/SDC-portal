import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationsListProps {
  notifications: Notification[];
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-sdc-dark">Recent</h3>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "relative rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow",
            !notification.read && "border-l-4 border-l-sdc-primary"
          )}
        >
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <p className="mt-1 text-xs text-sdc-muted">
            {notification.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-sdc-muted">{notification.time}</span>
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 rounded-full p-0 text-xs text-sdc-primary hover:bg-sdc-primary/10"
              >
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Mark as read
              </Button>
            )}
          </div>
        </div>
      ))}
      <Button variant="outline" className="mt-2 w-full text-xs">
        View All Notifications
      </Button>
    </div>
  );
}
