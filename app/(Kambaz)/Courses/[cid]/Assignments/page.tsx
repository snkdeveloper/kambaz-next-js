"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db  from "../../../Database";
import "../../../../../app/(Kambaz)/styles.css";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments-page" className="p-3 bg-light">
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-between p-3 border border-secondary-subtle bg-secondary-subtle"
        style={{ borderBottom: "2px solid #ccc" }}
      >
        <div className="d-flex align-items-center">
          <BsGripVertical className="fs-4 me-2 text-secondary" />
          <h5 className="fw-semibold m-0">ASSIGNMENTS</h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span
            className="fw-semibold px-3 py-1 bg-white border rounded-pill"
            style={{ fontSize: "0.9rem" }}
          >
            40% of Total
          </span>
          <button className="btn btn-sm btn-outline-secondary rounded-circle fw-bold">
            +
          </button>
          <BsThreeDotsVertical className="fs-5 text-secondary" />
        </div>
      </div>

      {/* Assignment list */}
      <ListGroup className="rounded-0">
        {assignments.map((a) => (
          <ListGroupItem
            key={a._id}
            className="d-flex align-items-start justify-content-between border-success bg-white"
            style={{ borderWidth: "0px 0px 0px 4px" }}
          >
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-3 mt-1 fs-4 text-secondary" />
              <FaRegFileAlt className="me-3 mt-1 fs-4 text-secondary" />
              <div>
                <Link
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="text-decoration-none fw-semibold text-dark fs-5"
                >
                  {a.title}
                </Link>
                <div className="text-muted small mt-1">
                  <span className="text-danger fw-semibold">Multiple Modules</span>{" "}
                  | <strong>Not available until</strong> {a.available || "TBA"} at 12:00am |{" "}
                  <strong>Due</strong> {a.due || "TBA"} at 11:59pm |{" "}
                  {a.points || 100} pts
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle className="text-success fs-4" />
              <BsThreeDotsVertical className="fs-5 text-secondary" />
            </div>
          </ListGroupItem>
        ))}

        {assignments.length === 0 && (
          <div className="p-3 text-muted">No assignments found for this course.</div>
        )}
      </ListGroup>
    </div>
  );
}
