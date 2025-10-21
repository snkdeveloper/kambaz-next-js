"use client";
import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  // find selected assignment
  const assignment = db.assignments.find(
    (a) => a.course === cid && a._id === aid
  );

  if (!assignment) {
    return (
      <div className="p-4 text-danger">
        <h5>Assignment not found.</h5>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>Edit Assignment</h3>
      <Form>
        {/* Assignment Name */}
        <Form.Label className="mt-3">Assignment Name</Form.Label>
        <Form.Control type="text" defaultValue={assignment.title} />

        {/* Description */}
        <Form.Label className="mt-3">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          defaultValue={
            
            "Enter the assignment details or description here."
          }
        />

        {/* Points */}
        <Form.Label className="mt-3">Points</Form.Label>
        <Form.Control type="number" defaultValue={ 100} />

        {/* Assignment Group & Display Grade */}
        <Row className="mt-3">
          <Col>
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select defaultValue="Assignments">
              <option value="Assignments">ASSIGNMENTS</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Display Grade As</Form.Label>
            <Form.Select defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type */}
        <Form.Label className="mt-3">Submission Type</Form.Label>
        <Form.Select defaultValue="Submission">
          <option value="Submission">Online</option>
        </Form.Select>

        {/* Online Entry Options */}
        <Form.Label className="mt-3">Online Entry Options</Form.Label>
        <div>
          <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
          <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
          <Form.Check type="checkbox" id="wd-media-recording" label="Media Recording" />
          <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" />
          <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
        </div>

        {/* Assign To & Due Date */}
        <Row className="mt-3">
          <Col>
            <Form.Label>Assign To</Form.Label>
            <Form.Control type="text" placeholder="Everyone" />
          </Col>
          <Col>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="text"
              defaultValue={"TBA"}
              readOnly
            />
          </Col>
        </Row>

        {/* Available From / Until */}
        <Row className="mt-3">
          <Col>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="text"
              defaultValue={"TBA"}
              readOnly
            />
          </Col>
          <Col>
            <Form.Label>Available Until</Form.Label>
            <Form.Control type="text" defaultValue={ "TBA"} readOnly />
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-primary">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
