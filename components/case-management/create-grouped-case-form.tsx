"use client";

import type React from "react";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MapPin, User } from "lucide-react";
import { caseFormSchema } from "./create-case-form";
import { generateErrorMessage, postRequest } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";

interface CreateGroupedCaseFormProps {
    onSuccess: () => void;
}

interface Student {
    full_name: string;
    matric_number: string;
    role: string;
    department: string;
    faculty: string;
    level: string;
    email: string;
    phone: string;
}

export function CreateGroupedCaseForm({
    onSuccess,
}: CreateGroupedCaseFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [offence_type, setOffenceType] = useState("");
    const [incident_date, setIncidentDate] = useState("");
    const [incident_time, setIncidentTime] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [reported_by, setReportedBy] = useState("");
    const [reporter_mail, setReporterEmail] = useState("");
    const [reporters_phone, setReporterPhone] = useState("");
    const [priority, setPriority] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [newStudent, setNewStudent] = useState<Student>({
        full_name: "",
        matric_number: "",
        role: "Collaborator",
        department: "",
        faculty: "",
        level: "",
        email: "",
        phone: "",
    });

    const handleAddStudent = () => {
        if (
            newStudent.full_name &&
            newStudent.matric_number &&
            newStudent.department &&
            newStudent.faculty
        ) {
            setStudents([...students, newStudent]);
            setNewStudent({
                full_name: "",
                matric_number: "",
                role: "Collaborator",
                department: "",
                faculty: "",
                level: "",
                email: "",
                phone: "",
            });
        }
    };

    const handleRemoveStudent = (index: number) => {
        setStudents(students.filter((_, i) => i !== index));
    };
    const handleUpdateStudentField = useCallback((values: Partial<Student>) => {
        setNewStudent((prevStudent) => {
            return { ...prevStudent, values };
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formattedDate =
            incident_date && format(incident_date, "yyyy-MM-dd");
        const groupedCase: caseFormSchema = {
            title,
            description,
            case_type: "Grouped",
            offence_type,
            incident_date: formattedDate,
            incident_time,
            location,
            position,
            reported_by,
            reporter_mail,
            reporters_phone,
            priority,
            students,
        };
        try {
            const response = await postRequest<caseFormSchema>(
                "/create/case/",
                groupedCase
            );

            if (response) {
                setIsSubmitting(false);
                toast.success(response.message);
            }
        } catch (error) {
            const errorMessage = generateErrorMessage(error);
            toast.error(errorMessage);
            setIsSubmitting(false);
        }
    
        onSuccess();
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Create Grouped Case
                </h1>
                <p className="text-gray-600 mt-1">
                    Create a new case involving multiple students
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Case Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Case Information
                        </CardTitle>
                        <CardDescription>
                            Basic information about the grouped case
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Case Title *</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Academic Dishonesty - Group Assignment"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="offenceType">
                                    Offence Type *
                                </Label>
                                <Select
                                    value={offence_type}
                                    onValueChange={setOffenceType}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select offence type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Academic Dishonesty">
                                            Academic Dishonesty
                                        </SelectItem>
                                        <SelectItem value="Behavioral Misconduct">
                                            Behavioral Misconduct
                                        </SelectItem>
                                        <SelectItem value="Property Damage">
                                            Property Damage
                                        </SelectItem>
                                        <SelectItem value="Substance Violation">
                                            Substance Violation
                                        </SelectItem>
                                        <SelectItem value="Harassment">
                                            Harassment
                                        </SelectItem>
                                        <SelectItem value="Examination Malpractice">
                                            Examination Malpractice
                                        </SelectItem>
                                        <SelectItem value="Other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detailed description of the incident..."
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority Level *</Label>
                            <Select
                                value={priority}
                                onValueChange={setPriority}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Critical">
                                        Critical
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Incident Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Incident Details
                        </CardTitle>
                        <CardDescription>
                            When and where the incident occurred
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="incidentDate">
                                    Incident Date *
                                </Label>
                                <Input
                                    id="incidentDate"
                                    type="date"
                                    value={incident_date}
                                    onChange={(e) =>
                                        setIncidentDate(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="incidentTime">
                                    Incident Time
                                </Label>
                                <Input
                                    id="incidentTime"
                                    type="time"
                                    value={incident_time}
                                    onChange={(e) =>
                                        setIncidentTime(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    placeholder="e.g., Library, Lecture Hall A"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reporter Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Reporter Information
                        </CardTitle>
                        <CardDescription>
                            Details of the person who reported this incident
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="reportedBy">
                                    Reported By *
                                </Label>
                                <Input
                                    id="reportedBy"
                                    value={reported_by}
                                    onChange={(e) =>
                                        setReportedBy(e.target.value)
                                    }
                                    placeholder="Full name of reporter"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reporter-title">
                                    Reporter Position
                                </Label>
                                <Input
                                    id="report-tttle"
                                    type="text"
                                    value={position}
                                    onChange={(e) =>
                                        setPosition(e.target.value)
                                    }
                                    placeholder="e.g., Professor, Security Officer, Student"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="reporterEmail">
                                    Reporter Email
                                </Label>
                                <Input
                                    id="reporterEmail"
                                    type="email"
                                    value={reporter_mail}
                                    onChange={(e) =>
                                        setReporterEmail(e.target.value)
                                    }
                                    placeholder="reporter@university.edu.ng"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reporterPhone">
                                    Reporter Phone
                                </Label>
                                <Input
                                    id="reporterPhone"
                                    value={reporters_phone}
                                    onChange={(e) =>
                                        setReporterPhone(e.target.value)
                                    }
                                    placeholder="+234 xxx xxx xxxx"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Students Involved */}
                <Card>
                    <CardHeader>
                        <CardTitle>Students Involved</CardTitle>
                        <CardDescription>
                            Add all students involved in this case with their
                            complete details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Add Student Form */}
                        <div className="border rounded-lg p-6 bg-gray-50">
                            <h4 className="font-medium mb-4">Add Student</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="studentName">
                                        Student Name *
                                    </Label>
                                    <Input
                                        id="studentName"
                                        value={newStudent.full_name}
                                        onChange={(e) =>
                                            handleUpdateStudentField({
                                                full_name: e.target.value,
                                            })
                                        }
                                        placeholder="Full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="matricNumber">
                                        Matric Number *
                                    </Label>
                                    <Input
                                        id="matricNumber"
                                        value={newStudent.matric_number}
                                        onChange={(e) =>
                                            setNewStudent({
                                                ...newStudent,
                                                matric_number: e.target.value,
                                            })
                                        }
                                        placeholder="STU-12345"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role *</Label>
                                    <Select
                                        value={newStudent.role}
                                        onValueChange={(value) =>
                                            setNewStudent({
                                                ...newStudent,
                                                role: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Primary Offender">
                                                Primary Offender
                                            </SelectItem>
                                            <SelectItem value="Collaborator">
                                                Collaborator
                                            </SelectItem>
                                            <SelectItem value="Witness">
                                                Witness
                                            </SelectItem>
                                            <SelectItem value="Victim">
                                                Victim
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="faculty">Faculty *</Label>
                                    <Select
                                        value={newStudent.faculty}
                                        onValueChange={(value) =>
                                            setNewStudent({
                                                ...newStudent,
                                                faculty: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select faculty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Engineering">
                                                Engineering
                                            </SelectItem>
                                            <SelectItem value="Sciences">
                                                Sciences
                                            </SelectItem>
                                            <SelectItem value="Arts">
                                                Arts
                                            </SelectItem>
                                            <SelectItem value="Business">
                                                Business
                                            </SelectItem>
                                            <SelectItem value="Medicine">
                                                Medicine
                                            </SelectItem>
                                            <SelectItem value="Law">
                                                Law
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">
                                        Department *
                                    </Label>
                                    <Input
                                        id="department"
                                        value={newStudent.department}
                                        onChange={(e) =>
                                            setNewStudent({
                                                ...newStudent,
                                                department: e.target.value,
                                            })
                                        }
                                        placeholder="e.g., Computer Science"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="level">Level *</Label>
                                    <Select
                                        value={newStudent.level}
                                        onValueChange={(value) =>
                                            setNewStudent({
                                                ...newStudent,
                                                level: value,
                                            })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="100">
                                                100 Level
                                            </SelectItem>
                                            <SelectItem value="200">
                                                200 Level
                                            </SelectItem>
                                            <SelectItem value="300">
                                                300 Level
                                            </SelectItem>
                                            <SelectItem value="400">
                                                400 Level
                                            </SelectItem>
                                            <SelectItem value="500">
                                                500 Level
                                            </SelectItem>
                                            <SelectItem value="Graduate">
                                                Graduate
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newStudent.email}
                                        onChange={(e) =>
                                            setNewStudent({
                                                ...newStudent,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="student@university.edu"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={newStudent.phone}
                                        onChange={(e) =>
                                            setNewStudent({
                                                ...newStudent,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="+234 xxx xxx xxxx"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button
                                    type="button"
                                    onClick={handleAddStudent}
                                    className="w-full md:w-auto"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Student
                                </Button>
                            </div>
                        </div>

                        {/* Added Students List */}
                        {students.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="font-medium">
                                    Added Students ({students.length})
                                </h4>
                                <div className="space-y-3">
                                    {students.map((student, index) => (
                                        <div
                                            key={index}
                                            className="border rounded-lg p-4 bg-white"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {student?.full_name}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {
                                                                student?.matric_number
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">
                                                            {student.faculty} -{" "}
                                                            {student.department}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {student.level}{" "}
                                                            Level
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">
                                                            {student.role}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleRemoveStudent(
                                                            index
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-700 ml-4"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {(student.email ||
                                                student.phone) && (
                                                <div className="mt-2 pt-2 border-t">
                                                    <div className="flex gap-4 text-sm text-gray-600">
                                                        {student.email && (
                                                            <span>
                                                                📧{" "}
                                                                {student.email}
                                                            </span>
                                                        )}
                                                        {student.phone && (
                                                            <span>
                                                                📞{" "}
                                                                {student.phone}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={onSuccess}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-sdc-blue hover:bg-sdc-blue/90 text-white"
                        disabled={isSubmitting ? true : false}
                    >
                        {isSubmitting
                            ? "Creating Group case..."
                            : "Create Grouped Case"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
