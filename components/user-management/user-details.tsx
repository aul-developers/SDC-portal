"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Save,
  UserCog,
  Shield,
  Clock,
  FileText,
} from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { updateUser, getUser } from "@/actions/user-management";

import { useAuth } from "@/app/context/auth-context";

interface UserDetailsProps {
  userId: string;
  onClose: (refresh?: boolean) => void;
}

export function UserDetails({ userId, onClose }: UserDetailsProps) {
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Start false, set true when fetch begins
  const [user, setUser] = useState<any>(null);

  // State for form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "",
    permissions: {
      manageUsers: false,
      manageOffences: false,
      managePunishments: false,
      viewReports: false,
      exportData: false,
    },
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      setIsLoading(true);
      try {
        const data = await getUser(userId);
        if (!isMounted) return;

        console.log("User details fetched:", data);
        setUser(data);
        setFormValues({
          name: data.full_name || "",
          email: data.email || "",
          phone: data.phone_no || "",
          role: data.role || "",
          department: data.department || "",
          status: data.status || "active",
          permissions: {
            manageUsers: false,
            manageOffences: false,
            managePunishments: false,
            viewReports: false,
            exportData: false,
          },
        });
      } catch (error: any) {
        if (!isMounted) return;
        console.error("Error fetching user details:", error);
        toast.error("Failed to load user details", {
          description: error.message,
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (userId) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Handle form changes
  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle permission toggle
  const handlePermissionToggle = (permission: string) => {
    setFormValues((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]:
          !prev.permissions[permission as keyof typeof prev.permissions],
      },
    }));
  };

  // Handle save
  const handleSave = async () => {
    try {
      // Check for Board Member Role -> Request Approval
      if (currentUser?.role === "board_member") {
        const supabase = createClient();
        const changes = {
          id: userId, // Target User ID
          full_name: formValues.name,
          phone_no: formValues.phone,
          role: formValues.role,
        };

        // Insert into approval_requests
        const { error } = await supabase.from("approval_requests").insert({
          request_type: "UPDATE_USER",
          request_data: changes,
          requester_id: currentUser.id,
          status: "PENDING",
        });

        if (error) throw error;

        toast.success("Update request submitted for Super Admin approval.");
        onClose(false); // Close without hard refresh since data didn't change yet
        return;
      }

      // Super Admin -> Direct Update
      const result = await updateUser(userId, {
        full_name: formValues.name,
        phone_no: formValues.phone,
        role: formValues.role,
      });

      if (result.success) {
        toast.success("User updated successfully");
        onClose(true); // Signal refresh
      } else {
        toast.error("Failed to update user", {
          description: result.message,
        });
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user", { description: error.message });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          Loading user details...
        </CardContent>
      </Card>
    );
  }

  if (!user && !isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User not found</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => onClose(false)} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => onClose(false)}
            variant="ghost"
            size="sm"
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSave}
              className="bg-sdc-blue hover:bg-sdc-blue/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <UserAvatar
              name={formValues.name}
              avatarUrl={user.avatar_url}
              className="h-16 w-16"
            />
          </div>
          <div>
            <CardTitle>{formValues.name}</CardTitle>
            <CardDescription>{formValues.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Tabs defaultValue="profile">
        <TabsList className="mx-6 mb-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formValues.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formValues.email}
                  disabled // Email usually not editable
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formValues.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="board_member">Board Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Removed Department and Status as they might not be in the profiles table yet */}
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="permissions">
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="mb-4 text-sm font-medium">User Permissions</h3>
                <div className="text-sm text-gray-500 text-center py-4">
                  Permissions management is currently under development.
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="activity">
          <CardContent>
            <div className="text-center text-sm text-gray-500 py-4">
              Activity logs will be available here.
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button onClick={() => onClose(false)} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-sdc-blue hover:bg-sdc-blue/90"
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
