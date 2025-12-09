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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Building, Briefcase } from "lucide-react";

export default function ProfilePage() {
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
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src="/diverse-user-avatars.png"
                  alt="Profile picture"
                />
                <AvatarFallback className="bg-sdc-navy text-white text-2xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <CardTitle className="text-xl text-sdc-navy">
              Dr. Sarah Johnson
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Committee Chair
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
                Admin
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>sarah.j@aul.edu.ng</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+234 801 234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Building className="h-4 w-4" />
                <span>Student Disciplinary Committee</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Admin Block, Room 304</span>
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
                  defaultValue="Sarah"
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue="Johnson"
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
                  defaultValue="sarah.j@aul.edu.ng"
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+234 801 234 5678" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="bio"
                placeholder="Tell us a little about yourself"
                defaultValue="Experienced academic administrator with over 10 years in student affairs."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-sdc-navy hover:bg-sdc-navy/90 text-white">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
