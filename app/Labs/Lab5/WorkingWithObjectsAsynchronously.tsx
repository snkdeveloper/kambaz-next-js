"use client";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "./Client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  // Fetch assignment on component mount
  const fetchAssignment = async () => {
    try {
      const fetchedAssignment = await client.fetchAssignment();
      console.log("Fetched assignment:", fetchedAssignment);
      setAssignment(fetchedAssignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  // Update assignment title on server
  const handleUpdateTitle = async () => {
    try {
      console.log("Updating title to:", assignment.title);
      const updatedAssignment = await client.updateTitle(assignment.title);
      console.log("Server returned:", updatedAssignment);
      setAssignment(updatedAssignment);
      alert("Title updated successfully!"); // ← Add user feedback
    } catch (error: any) {
      console.error("Error updating title:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      {/* Title Input */}
      <div className="mb-2">
        <label className="form-label">Title:</label>
        <FormControl
          value={assignment.title || ""}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      {/* Description Input */}
      <div className="mb-2">
        <label className="form-label">Description:</label>
        <FormControl
          as="textarea"
          rows={3}
          value={assignment.description || ""}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>

      {/* Due Date Input */}
      <div className="mb-2">
        <label className="form-label">Due Date:</label>
        <FormControl
          type="date"
          value={assignment.due || ""}
          onChange={(e) =>
            setAssignment({ ...assignment, due: e.target.value })
          }
        />
      </div>

      {/* Completed Checkbox */}
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed || false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>

      {/* Update Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={handleUpdateTitle}
        id="wd-update-assignment-title"
      >
        Update
      </button>

      {/* Display Current Assignment as JSON */}
      <h5>Current Assignment Object:</h5>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}