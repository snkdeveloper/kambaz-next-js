// app/(Kambaz)/Enrollments/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import enrollmentsData from "../Database/enrollments.json"; // import JSON
import { v4 as uuidv4 } from "uuid";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

// Helper function to safely access localStorage
const getInitialEnrollments = (): Enrollment[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("enrollments");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading enrollments from localStorage:", error);
    }
  }
  return enrollmentsData;
};

const initialState: EnrollmentState = {
  enrollments: getInitialEnrollments(),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const exists = state.enrollments.some(
        e => e.user === action.payload.user && e.course === action.payload.course
      );
      if (!exists) {
        state.enrollments.push({
          _id: uuidv4(),
          user: action.payload.user,
          course: action.payload.course,
        });
        // Persist immediately after adding
        if (typeof window !== "undefined") {
          localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
        }
      }
    },
    removeEnrollment: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        e => !(e.user === action.payload.user && e.course === action.payload.course)
      );
      // Persist immediately after removing
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
      // Persist immediately after setting
      if (typeof window !== "undefined") {
        localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
      }
    },
  },
});

export const { addEnrollment, removeEnrollment, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;