// app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments, deleteAssignment } from "./reducer";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { ListGroup, Button } from "react-bootstrap";
import * as client from "./client";

// Safe date formatting function
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "No date";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

const formatTime = (dateString: string | undefined | null) => {
  if (!dateString) return "12:00 AM";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "12:00 AM";
    
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "12:00 AM";
  }
};

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Fetch assignments from server on component mount
 useEffect(() => {
  const fetchAssignments = async () => {
    try {
      console.log("🔄 Fetching assignments for course:", cid);  
      const serverAssignments = await client.findAssignmentsForCourse(cid as string);
      console.log("📥 Server returned assignments:", serverAssignments);  
      console.log("📊 Number of assignments:", serverAssignments.length);  
      dispatch(setAssignments(serverAssignments));
    } catch (error) {
      console.error("❌ Error fetching assignments:", error);
    }
  };
  
  if (cid) {
    fetchAssignments();
  }
}, [cid, dispatch]);
  
  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  console.log("🎯 Filtered assignments for display:", courseAssignments);  // ✅ Add
  console.log("📌 Current course ID:", cid);  // ✅ Add
  console.log("📦 All assignments in Redux:", assignments);  // ✅ Add
  
  const isFaculty = currentUser?.role === "FACULTY";

  // Delete assignment from server
  const handleDeleteAssignment = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      try {
        await client.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
      } catch (error) {
        console.error("Error deleting assignment:", error);
        alert("Failed to delete assignment. Please try again.");
      }
    }
  };

  return (
    <div id="wd-assignments" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search for Assignment"
          id="wd-search-assignment"
        />
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-group-btn">
            <FaPlus /> Group
          </Button>
          {isFaculty && (
            <Button
              variant="danger"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
              id="wd-add-assignment-btn"
            >
              <FaPlus /> Assignment
            </Button>
          )}
        </div>
      </div>

      <ListGroup id="wd-assignment-list">
        <ListGroup.Item className="bg-secondary">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">ASSIGNMENTS</h4>
            <div>
              <span className="me-2">40% of Total</span>
              <FaPlus />
            </div>
          </div>
        </ListGroup.Item>

        {courseAssignments.length === 0 ? (
          <ListGroup.Item className="text-center text-muted py-4">
            No assignments found for this course.
          </ListGroup.Item>
        ) : (
          courseAssignments.map((assignment: any) => (
            <ListGroup.Item key={assignment._id} className="wd-assignment-list-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                  <div
                    onClick={() =>
                      router.push(`/Courses/${cid}/Assignments/${assignment._id}`)
                    }
                    style={{ cursor: "pointer" }}
                    className="wd-assignment-link"
                  >
                    <strong>{assignment.title}</strong>
                  </div>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong>{" "}
                    {formatDate(assignment.availableFrom)} at{" "}
                    {formatTime(assignment.availableFrom)} |{" "}
                    <strong>Due</strong> {formatDate(assignment.dueDate)} at{" "}
                    {formatTime(assignment.dueDate)} | {assignment.points} pts
                  </div>
                </div>
                {isFaculty && (
                  <div className="d-flex align-items-center">
                    <FaPencil
                      className="text-primary me-3"
                      onClick={() =>
                        router.push(`/Courses/${cid}/Assignments/${assignment._id}`)
                      }
                      style={{ cursor: "pointer" }}
                    />
                    <FaTrash
                      className="text-danger"
                      onClick={() => handleDeleteAssignment(assignment._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
}