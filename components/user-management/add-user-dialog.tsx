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
import { postRequest } from "@/lib/utils";
import { toast } from "sonner";
import LoadingButton from "../LoadingButton";

interface AddUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface userSchema {
    fullName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    faculty: string;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
    const [formValues, setFormValues] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        faculty: "",
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
            faculty: formValues.faculty,
        };
        // In a real app, this would add the user to the database

        try {
            const response = await postRequest<userSchema>(
                "/create/user/",
                newUser
            );

            if (response) {
                setIsSubmiting(false);
                toast.success(response.message);
            }
        } catch (error) {
            setIsSubmiting(false);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error, occured";

            toast.error(errorMessage);
        }

        // Reset form and close dialog
        setFormValues({
            fullName: "",
            username: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            faculty: "",
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Create a new user account for the SDC portal. All
                            users will receive an email invitation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    disabled={isSubmiting}
                                    value={formValues.fullName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "fullName",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">username</Label>
                                <Input
                                    disabled={isSubmiting}
                                    id="name"
                                    value={formValues.username}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "username",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">password</Label>
                                <Input
                                    id="name"
                                    value={formValues.password}
                                    disabled={isSubmiting}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "password",
                                            e.target.value
                                        )
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
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
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
                                    onChange={(e) =>
                                        handleInputChange(
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={formValues.role}
                                    disabled={isSubmiting}
                                    onValueChange={(value) =>
                                        handleInputChange("role", value)
                                    }
                                    required
                                >
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Chairman">
                                            Chairman
                                        </SelectItem>
                                        <SelectItem value="Secretary">
                                            SDC Secretary
                                        </SelectItem>
                                        <SelectItem value="Member">
                                            SDC Member
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    value={formValues.faculty}
                                    disabled={isSubmiting}
                                    onValueChange={(value) =>
                                        handleInputChange("faculty", value)
                                    }
                                    required
                                >
                                    <SelectTrigger id="faculty">
                                        <SelectValue placeholder="Select faculty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Faculty of Law">
                                            Faculty of Law
                                        </SelectItem>
                                        <SelectItem value="Faculty of Social Sciences">
                                            Faculty of Social Sciences
                                        </SelectItem>
                                        <SelectItem value="Faculty of Education">
                                            Faculty of Education
                                        </SelectItem>
                                        <SelectItem value="Faculty of Science">
                                            Faculty of Science
                                        </SelectItem>
                                        <SelectItem value="Faculty of Arts">
                                            Faculty of Arts
                                        </SelectItem>
                                        <SelectItem value="Faculty of Engineering">
                                            Faculty of Engineering
                                        </SelectItem>
                                        <SelectItem value="Faculty of Medicine">
                                            Faculty of Medicine
                                        </SelectItem>
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
