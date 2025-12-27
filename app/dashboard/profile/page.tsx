"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Building, Briefcase } from "lucide-react";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/app/context/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      // Split full name if available
      const nameParts = user.user_metadata?.full_name?.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || "",
      }));

      // Fetch extended profile if exists
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile(data);
          // If profile has specific fields, overlay them
          // Assuming 'full_name' is master, but if phone/bio exist...
          // For now, we'll stick to user_metadata for name/email basics
        }
      };

      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleSave = async () => {
    setLoading(true);
    // Update profile in DB
    // We would update 'profiles' table.
    // Since schema is not fully known, we will assume we can update 'full_name' at least.
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        // phone: formData.phone // Uncomment if schema supports
      })
      .eq("id", user?.id);

    // Also update auth metadata for immediate reflection
    await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
    setLoading(false);
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-sdc-navy">
          My Profile
        </h1>
        <p className="text-gray-500">
          Manage your personal information and account details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Card */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="text-center">
            <div className="mx-auto relative h-24 w-24 mb-4">
              <UserAvatar
                name={
                  user.user_metadata?.full_name ||
                  `${formData.firstName} ${formData.lastName}`
                }
                avatarUrl={user.user_metadata?.avatar_url} // Or null if we want to force initials
                className="h-24 w-24 text-2xl shadow-lg"
              />
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <CardTitle className="text-xl text-sdc-navy">
              {formData.firstName} {formData.lastName}
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              {user.role}
            </CardDescription>
            <div className="mt-2 flex justify-center gap-2">
              <Badge
                variant="secondary"
                className="bg-sdc-blue/10 text-sdc-blue hover:bg-sdc-blue/20"
              >
                Active
              </Badge>
              <Badge
                variant="secondary"
                className="bg-sdc-navy/10 text-sdc-navy hover:bg-sdc-navy/20"
              >
                {user.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </div>
              {/* Hide others if not real data
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+234...</span>
              </div>
              */}
              <div className="flex items-center gap-3 text-gray-600">
                <Building className="h-4 w-4" />
                <span>Anchor University</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  readOnly
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  readOnly
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              {/* Phone disabled for now as it's not in metadata */}
              {/*
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={formData.phone} />
              </div>
              */}
            </div>

            {/* Bio disabled for now
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                className="..."
                id="bio"
                defaultValue="..."
              />
            </div>
            */}

            <div className="flex justify-end gap-4">
              <Button
                className="bg-sdc-navy hover:bg-sdc-navy/90 text-white"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
