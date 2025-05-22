"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, UserCog, Shield, Clock, FileText } from "lucide-react"
import Image from "next/image"

// Mock user data - same as in user-list.tsx
const users = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "SDC Chairman",
    department: "Faculty of Law",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "/diverse-user-avatars.png",
    phone: "+1 (555) 123-4567",
    permissions: {
      manageUsers: true,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: true,
    },
    activityLog: [
      { action: "Logged in", timestamp: "Today, 10:23 AM" },
      { action: "Updated user profile", timestamp: "Yesterday, 3:45 PM" },
      { action: "Created new case", timestamp: "May 12, 2023, 11:30 AM" },
    ],
  },
  {
    id: "2",
    name: "Prof. Michael Brown",
    email: "m.brown@university.edu",
    role: "SDC Member",
    department: "Faculty of Social Sciences",
    status: "active",
    lastActive: "1 day ago",
    avatar: "/monogram-mb.png",
    phone: "+1 (555) 234-5678",
    permissions: {
      manageUsers: false,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: true,
    },
    activityLog: [
      { action: "Logged in", timestamp: "Yesterday, 9:15 AM" },
      { action: "Reviewed case #1234", timestamp: "May 14, 2023, 2:30 PM" },
      { action: "Updated punishment status", timestamp: "May 10, 2023, 10:45 AM" },
    ],
  },
  {
    id: "3",
    name: "Dr. James Lee",
    email: "j.lee@university.edu",
    role: "SDC Secretary",
    department: "Faculty of Education",
    status: "active",
    lastActive: "3 hours ago",
    avatar: "/stylized-jl-logo.png",
    phone: "+1 (555) 345-6789",
    permissions: {
      manageUsers: false,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: true,
    },
    activityLog: [
      { action: "Logged in", timestamp: "Today, 8:30 AM" },
      { action: "Added new offence", timestamp: "May 13, 2023, 1:15 PM" },
      { action: "Generated report", timestamp: "May 9, 2023, 4:20 PM" },
    ],
  },
  {
    id: "4",
    name: "Prof. David Wilson",
    email: "d.wilson@university.edu",
    role: "SDC Member",
    department: "Faculty of Science",
    status: "inactive",
    lastActive: "2 weeks ago",
    avatar: "/abstract-dw.png",
    phone: "+1 (555) 456-7890",
    permissions: {
      manageUsers: false,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: false,
    },
    activityLog: [
      { action: "Account deactivated", timestamp: "May 1, 2023, 11:00 AM" },
      { action: "Logged in", timestamp: "April 30, 2023, 9:45 AM" },
      { action: "Reviewed case #5678", timestamp: "April 28, 2023, 3:30 PM" },
    ],
  },
  {
    id: "5",
    name: "Dr. Susan Jones",
    email: "s.jones@university.edu",
    role: "SDC Member",
    department: "Faculty of Arts",
    status: "active",
    lastActive: "5 hours ago",
    avatar: "/stylized-letters-sj.png",
    phone: "+1 (555) 567-8901",
    permissions: {
      manageUsers: false,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: true,
    },
    activityLog: [
      { action: "Logged in", timestamp: "Today, 9:00 AM" },
      { action: "Updated student record", timestamp: "May 14, 2023, 11:20 AM" },
      { action: "Created new punishment", timestamp: "May 12, 2023, 2:15 PM" },
    ],
  },
  {
    id: "6",
    name: "Prof. Elizabeth Parker",
    email: "e.parker@university.edu",
    role: "SDC Member",
    department: "Faculty of Engineering",
    status: "active",
    lastActive: "Yesterday",
    avatar: "/abstract-geometric-ep.png",
    phone: "+1 (555) 678-9012",
    permissions: {
      manageUsers: false,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: true,
    },
    activityLog: [
      { action: "Logged in", timestamp: "Yesterday, 10:30 AM" },
      { action: "Reviewed case #9012", timestamp: "May 13, 2023, 3:45 PM" },
      { action: "Updated offence details", timestamp: "May 11, 2023, 1:30 PM" },
    ],
  },
  {
    id: "7",
    name: "Dr. Samuel Miller",
    email: "s.miller@university.edu",
    role: "SDC Member",
    department: "Faculty of Medicine",
    status: "active",
    lastActive: "4 days ago",
    avatar: "/stylized-sm-logo.png",
    phone: "+1 (555) 789-0123",
    permissions: {
      manageUsers: false,
      manageOffences: true,
      managePunishments: true,
      viewReports: true,
      exportData: false,
    },
    activityLog: [
      { action: "Logged in", timestamp: "May 11, 2023, 8:15 AM" },
      { action: "Created new case", timestamp: "May 10, 2023, 2:30 PM" },
      { action: "Updated student record", timestamp: "May 9, 2023, 11:45 AM" },
    ],
  },
]

interface UserDetailsProps {
  userId: string
  onClose: () => void
}

export function UserDetails({ userId, onClose }: UserDetailsProps) {
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
  })

  // Find user by ID
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User not found</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={onClose} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Initialize form values with user data
  if (user) {
    setFormValues({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      status: user.status,
      permissions: { ...user.permissions },
    })
  }

  // Handle form changes
  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle permission toggle
  const handlePermissionToggle = (permission: string) => {
    setFormValues((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission as keyof typeof prev.permissions],
      },
    }))
  }

  // Handle save
  const handleSave = () => {
    // In a real app, this would save to the database
    console.log("Saving user:", formValues)
    onClose()
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Button onClick={onClose} variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} className="bg-sdc-blue hover:bg-sdc-blue/90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
          </div>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
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
                <Input id="name" value={formValues.name} onChange={(e) => handleInputChange("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formValues.email}
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
                <Select value={formValues.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SDC Chairman">SDC Chairman</SelectItem>
                    <SelectItem value="SDC Secretary">SDC Secretary</SelectItem>
                    <SelectItem value="SDC Member">SDC Member</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formValues.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Faculty of Law">Faculty of Law</SelectItem>
                    <SelectItem value="Faculty of Social Sciences">Faculty of Social Sciences</SelectItem>
                    <SelectItem value="Faculty of Education">Faculty of Education</SelectItem>
                    <SelectItem value="Faculty of Science">Faculty of Science</SelectItem>
                    <SelectItem value="Faculty of Arts">Faculty of Arts</SelectItem>
                    <SelectItem value="Faculty of Engineering">Faculty of Engineering</SelectItem>
                    <SelectItem value="Faculty of Medicine">Faculty of Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formValues.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="permissions">
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="mb-4 text-sm font-medium">User Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="manage-users" className="flex items-center gap-2">
                      <UserCog className="h-4 w-4" />
                      Manage Users
                    </Label>
                    <Switch
                      id="manage-users"
                      checked={formValues.permissions.manageUsers}
                      onCheckedChange={() => handlePermissionToggle("manageUsers")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="manage-offences" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Manage Offences
                    </Label>
                    <Switch
                      id="manage-offences"
                      checked={formValues.permissions.manageOffences}
                      onCheckedChange={() => handlePermissionToggle("manageOffences")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="manage-punishments" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Manage Punishments
                    </Label>
                    <Switch
                      id="manage-punishments"
                      checked={formValues.permissions.managePunishments}
                      onCheckedChange={() => handlePermissionToggle("managePunishments")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="view-reports" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Reports
                    </Label>
                    <Switch
                      id="view-reports"
                      checked={formValues.permissions.viewReports}
                      onCheckedChange={() => handlePermissionToggle("viewReports")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="export-data" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Export Data
                    </Label>
                    <Switch
                      id="export-data"
                      checked={formValues.permissions.exportData}
                      onCheckedChange={() => handlePermissionToggle("exportData")}
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>Note:</strong> Permission changes will take effect immediately after saving.
                </p>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="activity">
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="p-4">
                  <h3 className="mb-2 text-sm font-medium">Recent Activity</h3>
                  <div className="space-y-4">
                    {user.activityLog.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                        <div className="mt-0.5 rounded-full bg-gray-100 p-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                <p>Showing recent activity only. Full activity log is available in the audit system.</p>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-sdc-blue hover:bg-sdc-blue/90">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
