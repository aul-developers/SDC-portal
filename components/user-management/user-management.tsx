"use client";

import { useState } from "react";
import { UserList } from "./user-list";
import { UserDetails } from "./user-details";
import { AddUserDialog } from "./add-user-dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function UserManagement() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle user selection
  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };
  // Handle closing user details
  const handleCloseDetails = (shouldRefresh = false) => {
    setSelectedUserId(null);
    if (shouldRefresh) {
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  const handleUserCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setIsAddUserOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-sdc-blue focus:outline-none focus:ring-1 focus:ring-sdc-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={() => setIsAddUserOpen(true)}
          className="bg-sdc-blue hover:bg-sdc-blue/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {selectedUserId ? (
        <UserDetails
          userId={selectedUserId}
          onClose={handleCloseDetails} // Matches (shouldRefresh?: boolean) => void
        />
      ) : (
        <UserList
          onUserSelect={handleUserSelect}
          searchQuery={searchQuery}
          refreshTrigger={refreshTrigger}
        />
      )}

      <AddUserDialog
        open={isAddUserOpen}
        onOpenChange={setIsAddUserOpen}
        onSuccess={handleUserCreated}
      />
    </div>
  );
}
