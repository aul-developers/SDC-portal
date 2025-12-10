"use client";

import type React from "react";

import { useCallback, useMemo, useReducer, useState, useEffect } from "react";
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
  CalendarIcon,
  User,
  FileText,
  AlertTriangle,
  UserCheck,
  Clock,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn, generateErrorMessage, postRequest } from "@/lib/utils";
import { toast } from "sonner";

interface CreateCaseFormProps {
  onSuccess: () => void;
  initialData?: caseFormSchema;
}

export interface involvedStudentSchema {
  full_name: string;
  matric_number: string;
  department: string;
  faculty: string;
  level: string;
  email: string;
  phone: string;
}

export interface caseFormSchema {
  id?: number;
  title: string;
  offence_type: string;
  description: string;
  incident_date: string;
  case_type: "Individual" | "Grouped";
  incident_time: string;
  reported_by: string;
  location: string;
  position: string;
  priority: string;
  reporter_mail: string;
  reporters_phone: string;
  students?: involvedStudentSchema[] | Student[];
}
type formActions =
  | {
      type: "UPDATE_FIELD";
      field: keyof caseFormSchema;
      value: string;
    }
  | {
      type: "UPDATE_STUDENT_FIELD";
      field: keyof involvedStudentSchema;
      value: string;
    };

function updateFieldReducer(
  state: caseFormSchema,
  action: formActions
): caseFormSchema {
  switch (action.type) {
    case "UPDATE_FIELD":
      // Only update if value actually changed
      if (state[action.field] === action.value) {
        return state;
      }
      return {
        ...state,
        [action.field]: action.value,
      };

    default:
      return state;
  }
}

export interface Student {
  name: string;
  full_name?: string; // Optional to allow backward compat or strictly use one
  matricNumber: string;
  matric_number?: string;
  role: string;
  department: string;
  faculty: string;
  level: string;
  email: string;
  phone: string;
}

export function CreateCaseForm({
  onSuccess,
  initialData,
}: CreateCaseFormProps) {
  const initialFieldState: caseFormSchema = useMemo(
    () => ({
      title: initialData?.title || "",
      offence_type: initialData?.offence_type || "",
      description: initialData?.description || "",
      incident_date: initialData?.incident_date || "",
      case_type: initialData?.case_type || "Individual",
      incident_time: initialData?.incident_time || "",
      reported_by: initialData?.reported_by || "",
      location: initialData?.location || "",
      position: initialData?.position || "",
      priority: initialData?.priority || "",
      reporter_mail: initialData?.reporter_mail || "",
      reporters_phone: initialData?.reporters_phone || "",
      students: initialData?.students || [],
    }),
    [initialData]
  );
  const [state, dispatch] = useReducer<
    React.Reducer<caseFormSchema, formActions>
  >(updateFieldReducer, initialFieldState);

  // Load from local storage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("create-individual-case-form");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Dispatch updates for each field
        Object.keys(parsedState).forEach((key) => {
          // We need to cast key to keyof caseFormSchema to make TS happy,
          // but we can't easily iterate and dispatch in one go without a bulk update action.
          // For simplicity, let's just use the saved state if we could, but useReducer makes it harder.
          // Actually, let's just specific fields we care about or add a RESET/LOAD action.
          // To avoid changing the reducer too much, let's just rely on manual syncing or maybe just not use useReducer for this if possible?
          // No, useReducer is already there. Let's add a LOAD_STATE action.
          dispatch({
            type: "UPDATE_FIELD",
            field: key as keyof caseFormSchema,
            value: parsedState[key],
          });
        });
      } catch (e) {
        console.error("Failed to load form state", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("create-individual-case-form", JSON.stringify(state));
  }, [state]);

  const [studentInvolved, setStudentInvolved] = useState<involvedStudentSchema>(
    (initialData?.students?.[0] as involvedStudentSchema) || {
      full_name: "",
      matric_number: "",
      phone: "",
      level: "",
      faculty: "",
      department: "",
      email: "",
    }
  );
  const [date, setDate] = useState<Date | undefined>(
    initialData?.incident_date ? new Date(initialData.incident_date) : undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof caseFormSchema, value: string) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    []
  );
  const handleStudentInputChange = (
    field: keyof involvedStudentSchema,
    value: string
  ) => {
    setStudentInvolved((prevValues) => {
      return {
        ...prevValues,
        [field]: value,
      };
    });
  };

  function handleDatePick(selectedDate: Date | undefined) {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : "";
    dispatch({
      type: "UPDATE_FIELD",
      field: "incident_date",
      value: formattedDate,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const newIndividualCase: caseFormSchema = {
      ...state,
      students: [studentInvolved],
    };
    try {
      const response = await postRequest<caseFormSchema>(
        "/create/case/",
        newIndividualCase
      );
      if (response) {
        setIsSubmitting(false);
        toast.success(response.message);
        localStorage.removeItem("create-individual-case-form");
        onSuccess();
      }
    } catch (error) {
      const errorMessage = generateErrorMessage(error);
      toast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-sdc-navy">
          {initialData ? "Edit Individual Case" : "Create Individual Case"}
        </h2>
        <p className="text-gray-600">
          {initialData
            ? "Update the details of the disciplinary case"
            : "Fill in all the details to create a new disciplinary case"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Case Information */}
        <div className="bg-white rounded-3xl border-none shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <FileText className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">
              Basic Case Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="case-title" className="text-sm font-medium">
                Case Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="case-title"
                placeholder="e.g., Academic Dishonesty - Examination Malpractice"
                className="h-11"
                required
                value={state.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offence-type" className="text-sm font-medium">
                Offence Type <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={state.offence_type}
                onValueChange={(value) =>
                  handleInputChange("offence_type", value)
                }
              >
                <SelectTrigger id="offence-type" className="h-11">
                  <SelectValue placeholder="Select offence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic-dishonesty">
                    Academic Dishonesty
                  </SelectItem>
                  <SelectItem value="behavioral-misconduct">
                    Behavioral Misconduct
                  </SelectItem>
                  <SelectItem value="property-damage">
                    Property Damage
                  </SelectItem>
                  <SelectItem value="substance-violation">
                    Substance Violation
                  </SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Case Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              onChange={(e) => handleInputChange("description", e.target.value)}
              id="description"
              value={state.description}
              placeholder="Provide a detailed description of the case and incident"
              className="min-h-[100px]"
              required
            />
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-white rounded-3xl border-none shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <Clock className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">
              Incident Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="incident-date" className="text-sm font-medium">
                Incident Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selcetedDate) => handleDatePick(selcetedDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="incident-time" className="text-sm font-medium">
                Incident Time <span className="text-red-500">*</span>
              </Label>
              <Input
                onChange={(e) =>
                  handleInputChange("incident_time", e.target.value)
                }
                value={state.incident_time}
                id="incident-time"
                type="time"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority Level <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={state.priority}
                onValueChange={(value: string) =>
                  handleInputChange("priority", value)
                }
              >
                <SelectTrigger id="priority" className="h-11">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location of Incident <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              placeholder="e.g., Main Library, Room 204, Computer Lab A"
              className="h-11"
              value={state.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-3xl border-none shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <User className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">
              Student Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-sm font-medium">
                Student Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="student-name"
                value={studentInvolved.full_name}
                onChange={(e) =>
                  handleStudentInputChange("full_name", e.target.value)
                }
                placeholder="Enter student's full name"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-id" className="text-sm font-medium">
                Matric Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="student-id"
                value={studentInvolved.matric_number}
                onChange={(e) =>
                  handleStudentInputChange("matric_number", e.target.value)
                }
                placeholder="Enter matric number"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty" className="text-sm font-medium">
                Faculty <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={studentInvolved.faculty}
                onValueChange={(value: string) =>
                  handleStudentInputChange("faculty", value)
                }
              >
                <SelectTrigger id="faculty" className="h-11">
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="science">Faculty of Science</SelectItem>
                  <SelectItem value="engineering">
                    Faculty of Engineering
                  </SelectItem>
                  <SelectItem value="arts">Faculty of Arts</SelectItem>
                  <SelectItem value="business">Faculty of Business</SelectItem>
                  <SelectItem value="medicine">Faculty of Medicine</SelectItem>
                  <SelectItem value="law">Faculty of Law</SelectItem>
                  <SelectItem value="education">
                    Faculty of Education
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">
                Department <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={studentInvolved.department}
                onValueChange={(value: string) =>
                  handleStudentInputChange("department", value)
                }
              >
                <SelectTrigger id="department" className="h-11">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="electrical-engineering">
                    Electrical Engineering
                  </SelectItem>
                  <SelectItem value="mechanical-engineering">
                    Mechanical Engineering
                  </SelectItem>
                  <SelectItem value="business-admin">
                    Business Administration
                  </SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-medium">
                Academic Level <span className="text-red-500">*</span>
              </Label>
              <Select
                required
                value={studentInvolved.level}
                onValueChange={(value: string) =>
                  handleStudentInputChange("level", value)
                }
              >
                <SelectTrigger id="level" className="h-11">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                  <SelectItem value="500">500 Level</SelectItem>
                  <SelectItem value="graduate">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-email" className="text-sm font-medium">
                Student Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="student-email"
                type="email"
                value={studentInvolved.email}
                placeholder="student@university.edu"
                className="h-11"
                onChange={(e) =>
                  handleStudentInputChange("email", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                onChange={(e) =>
                  handleStudentInputChange("phone", e.target.value)
                }
                id="student-phone"
                value={studentInvolved.phone}
                type="tel"
                placeholder="+234 xxx xxx xxxx"
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* Reporter Information */}
        <div className="bg-white rounded-3xl border-none shadow-sm p-6 space-y-6">
          <div className="flex items-center space-x-2 border-b pb-3">
            <UserCheck className="h-5 w-5 text-sdc-blue" />
            <h3 className="text-lg font-semibold text-sdc-navy">
              Reporter Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reported-by" className="text-sm font-medium">
                Reporter Name <span className="text-red-500">*</span>
              </Label>
              <Input
                onChange={(e) =>
                  handleInputChange("reported_by", e.target.value)
                }
                value={state.reported_by}
                id="reported-by"
                placeholder="Name of person reporting"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter-title" className="text-sm font-medium">
                Reporter Title/Position <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reporter-title"
                value={state.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="e.g., Professor, Security Officer, Student"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter-email" className="text-sm font-medium">
                Reporter Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reporter-email"
                type="email"
                value={state.reporter_mail}
                placeholder="reporter@university.edu"
                className="h-11"
                onChange={(e) =>
                  handleInputChange("reporter_mail", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reporter-phone" className="text-sm font-medium">
                Reporter Phone
              </Label>
              <Input
                id="reporter-phone"
                value={state.reporters_phone}
                onChange={(e) =>
                  handleInputChange("reporters_phone", e.target.value)
                }
                type="tel"
                placeholder="+234 xxx xxx xxxx"
                className="h-11"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 bg-transparent">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            className="px-6 border-transparent bg-gray-100 hover:bg-gray-200 text-sdc-navy"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-sdc-blue hover:bg-sdc-blue/90 text-white px-6 shadow-lg shadow-sdc-blue/20 rounded-xl"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting
              ? initialData
                ? "Updating Case..."
                : "Creating Case..."
              : initialData
              ? "Update Individual Case"
              : "Create Individual Case"}
          </Button>
        </div>
      </form>
    </div>
  );
}
