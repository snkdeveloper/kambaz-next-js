"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";
import { FormControl, FormGroup, FormLabel, Button } from "react-bootstrap";

// Helper to get current date in datetime-local format (YYYY-MM-DDTHH:mm)
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Helper to format date string to datetime-local format
const formatDateTime = (dateString: string | undefined | null) => {
  if (!dateString) return getCurrentDateTime();
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return getCurrentDateTime();
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return getCurrentDateTime();
  }
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Initialize with proper datetime format
  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    description: "",
    points: 100,
    dueDate: getCurrentDateTime(),
    availableFrom: getCurrentDateTime(),
    availableUntil: getCurrentDateTime(),
    course: cid as string,
  });
// Populate form if editing an existing assignment
  useEffect(() => {
    if (aid !== "new") {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment({
          ...existingAssignment,
          dueDate: formatDateTime(existingAssignment.dueDate),
          availableFrom: formatDateTime(existingAssignment.availableFrom),
          availableUntil: formatDateTime(existingAssignment.availableUntil),
          course: cid as string,
        });
      }
    }
  }, [aid, assignments, cid]);

  const handleSave = () => {
    if (aid === "new") {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
          placeholder="Assignment Name"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl
          id="wd-description"
          as="textarea"
          rows={5}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
          placeholder="Assignment Description"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-points">Points</FormLabel>
        <FormControl
          id="wd-points"
          type="number"
          value={assignment.points}
          onChange={(e) =>
            setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-due-date">Due</FormLabel>
        <FormControl
          id="wd-due-date"
          type="datetime-local"
          value={assignment.dueDate}
          onChange={(e) =>
            setAssignment({ ...assignment, dueDate: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
        <FormControl
          id="wd-available-from"
          type="datetime-local"
          value={assignment.availableFrom}
          onChange={(e) =>
            setAssignment({ ...assignment, availableFrom: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="wd-available-until">Until</FormLabel>
        <FormControl
          id="wd-available-until"
          type="datetime-local"
          value={assignment.availableUntil}
          onChange={(e) =>
            setAssignment({ ...assignment, availableUntil: e.target.value })
          }
        />
      </FormGroup>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}