"use client";

import type React from "react";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import LoadingButton from "../LoadingButton";
import { useAuth } from "@/app/context/auth-context";
import { createClient } from "@/utils/supabase/client";
import { createUser } from "@/actions/user-management";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface userSchema {
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string;
}

export function AddUserDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddUserDialogProps) {
  const [formValues, setFormValues] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  // Handle form changes

  // const handleInputChange = (field: string, value: string) => {
  //     setFormValues((prev) => ({
  //         ...prev,
  //         [field]: value,
  //     }));
  // };

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const { user } = useAuth();
  const supabase = createClient();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmiting(true);
    const newUser: userSchema = {
      fullName: formValues.fullName,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      phone: formValues.phone,
      role: formValues.role,
    };

    try {
      if (!user) {
        throw new Error("You must be logged in.");
      }

      if (user.role === "viewer") {
        throw new Error("Viewers are not authorized to perform this action.");
      }

      if (user.role === "board_member") {
        // Submit Approval Request
        const { error } = await supabase.from("approval_requests").insert({
          request_type: "ADD_USER",
          request_data: newUser,
          requester_id: user.id,
          status: "PENDING",
        });

        if (error) throw error;
        toast.success("Request submitted for Super Admin approval.");
      } else {
        // Super Admin - Create directly via Server Action
        const response = await createUser(newUser);

        if (response.success) {
          toast.success(response.message);
        } else {
          throw new Error(response.message);
        }
      }

      // Reset form and close dialog
      setFormValues({
        fullName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
      // onOpenChange(false); // Handled by onSuccess in parent usually, or we call both
      if (onSuccess) {
        onSuccess();
      } else {
        onOpenChange(false);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account for the SDC portal. All users will
              receive an email invitation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  disabled={isSubmiting}
                  value={formValues.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  disabled={isSubmiting}
                  id="username"
                  value={formValues.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isSubmiting}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  disabled={isSubmiting}
                  value={formValues.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={formValues.password}
                  disabled={isSubmiting}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formValues.role}
                  disabled={isSubmiting}
                  onValueChange={(value) => handleInputChange("role", value)}
                  required
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
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            {isSubmiting ? (
              <LoadingButton text="Adding user..." />
            ) : (
              <Button
                type="submit"
                className="bg-sdc-blue hover:bg-sdc-blue/90"
              >
                Add User
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
