import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaBookOpen, FaPen } from "react-icons/fa";
import Link from "next/link";
import "../../../../../app/(Kambaz)/styles.css"
export default function Assignments() {
  return (
    <div id="wd-assignments-page" className="p-3">
      <AssignmentsControls />
      <br /><br /><br />

      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroupItem className="p-3 ps-2 mb-4 fs-5 border-gray">
          <BsGripVertical className="me-2 fs-3 text-secondary" />
          <strong>Upcoming Assignments</strong>
        </ListGroupItem>

        {/* Example Assignment Items */}
        <ListGroupItem className="wd-assignment p-3 ps-4 border-start border-4 border-success mb-3">
          <BsGripVertical className="me-2 fs-3 text-secondary" />
           <span className="me-3 position-relative">
              <FaBookOpen className="fs-4 text-success" />
              
            </span>
          <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link text-decoration-none fw-semibold fs-5 text-dark"
                style={{
                  transition: "color 0.2s ease-in-out",
                }}
            >
              A1 - ENV + HTML
            </Link>
          <AssignmentControlButtons />
          <div className="text-muted small mt-1">
            Multiple Modules | Due Oct 6 at 11:59pm | 100 pts
          </div>
        </ListGroupItem>

        <ListGroupItem className="wd-assignment p-3 ps-4 border-start border-4 border-success mb-3">
          <BsGripVertical className="me-2 fs-3 text-secondary" />
           <span className="me-3 position-relative">
              <FaBookOpen className="fs-4 text-success" />
              
            </span>
          <span className="fw-semibold fs-5">
            A2 - CSS + BOOTSTRAP
          </span>
          <AssignmentControlButtons />
          <div className="text-muted small mt-1">
            Available until Oct 6 at 11:59pm | 23 pts
          </div>
        </ListGroupItem>

        <ListGroupItem className="wd-assignment p-3 ps-4 border-start border-4 border-success mb-3">
          <BsGripVertical className="me-2 fs-3 text-secondary" />
           <span className="me-3 position-relative">
              <FaBookOpen className="fs-4 text-success" />
              
            </span>
          <span className="fw-semibold fs-5">
            A3 - JAVASCRIPT + REACT
          </span>
          <AssignmentControlButtons />
          <div className="text-muted small mt-1">
            Due Oct 20 at 11:59pm | 100 pts
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
