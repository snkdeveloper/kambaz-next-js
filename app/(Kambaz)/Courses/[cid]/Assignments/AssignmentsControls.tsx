"use client";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { FaBookOpen, FaPen } from "react-icons/fa";

export default function AssignmentsControls() {
  return (
    <div id="wd-assignments-controls" className="text-nowrap mb-4">
      {/* ➕ Add Assignment Button */}
      <Button
        variant="danger"
        size="lg"
        className="float-end me-2"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
        Assignment
      </Button>

      {/* ➕ Add Group Button */}
      <Button
        variant="danger"
        size="lg"
        className="float-end me-2"
        id="wd-add-group-btn"
      >
        <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
        Group
      </Button>

      {/* ✅ Publish All Dropdown */}
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all">
            Unpublish All
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* 🔍 Search Field (Left aligned) */}
      <div
        className="float-start d-flex align-items-center"
        style={{ maxWidth: "300px" }}
      >
        <i className="me-2 text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 
              1.415-1.415l-3.85-3.85zm-5.242.656a5 5 0 1 
              1 0-10 5 5 0 0 1 0 10z" />
          </svg>
        </i>
        <input
          type="text"
          placeholder="Search for Assignments"
          className="form-control py-1"
        />
      </div>
    </div>
  );
}
