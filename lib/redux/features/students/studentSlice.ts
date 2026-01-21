import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createClient } from "@/utils/supabase/client";
import { Student } from "@/app/_types";

interface ExtendedStudent extends Student {
    caseCount: number;
    image: string;
    name: string;
    faculty: string;
}

interface StudentState {
    items: ExtendedStudent[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    page: number;
    totalPages: number;
}

const initialState: StudentState = {
    items: [],
    status: "idle",
    error: null,
    page: 1,
    totalPages: 1,
};

export const fetchStudents = createAsyncThunk(
    "students/fetchStudents",
    async (page: number, { rejectWithValue }) => {
        const supabase = createClient();
        try {
            const pageSize = 20;
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            // Fetch students from DB
            const {
                data: studentsData,
                error: studentsError,
                count,
            } = await supabase
                .from("students")
                .select("*", { count: "exact" })
                .range(from, to)
                .order("full_name", { ascending: true });

            if (studentsError) throw studentsError;

            if (!studentsData || studentsData.length === 0) {
                return { students: [], totalPages: 1 };
            }

            // Fetch case counts for these students
            const studentIds = studentsData.map((s) => s.id);
            const { data: casesData } = await supabase
                .from("cases")
                .select("student_id")
                .in("student_id", studentIds);

            // Map case counts
            const caseCounts: Record<string, number> = {};
            if (casesData) {
                casesData.forEach((c: any) => {
                    caseCounts[c.student_id] = (caseCounts[c.student_id] || 0) + 1;
                });
            }

            const transformed = studentsData.map((item: any) => ({
                id: item.id,
                name:
                    item.full_name ||
                    `${item.first_name || ""} ${item.last_name || ""}`.trim(),
                firstName: item.first_name || item.full_name?.split(" ")[0] || "",
                lastName:
                    item.last_name || item.full_name?.split(" ").slice(1).join(" ") || "",
                full_name: item.full_name,
                matricNumber: item.matric_number,
                matric_number: item.matric_number,
                department: item.department,
                faculty: item.faculty || "Science and Technology",
                level: item.level || "N/A",
                caseCount: caseCounts[item.id] || 0,
                image: item.image_url || "/placeholder.svg",
                status: item.status || "active",
            }));

            return {
                students: transformed,
                totalPages: Math.ceil((count || 0) / pageSize),
            };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload.students;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { setPage } = studentSlice.actions;

export default studentSlice.reducer;
