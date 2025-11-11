"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { ListGroup, Button } from "react-bootstrap";

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
  
  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );
  
  const isFaculty = currentUser?.role === "FACULTY";

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

        {courseAssignments.map((assignment: any) => (
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
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this assignment?"
                        )
                      ) {
                        dispatch(deleteAssignment(assignment._id));
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}