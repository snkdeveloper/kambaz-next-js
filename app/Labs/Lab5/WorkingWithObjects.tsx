// app/Labs/Lab5/WorkingWithObjects.tsx - Client Side
"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS Module",
    description: "Learn about NodeJS",
    course: "CS5610"
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* ========== ASSIGNMENT SECTION ========== */}
      <h4>Retrieving Objects</h4>
      <a 
        id="wd-retrieve-assignments" 
        className="btn btn-primary"
        href={ASSIGNMENT_API_URL}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a 
        id="wd-retrieve-assignment-title" 
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Properties</h4>
      <a 
        className="btn btn-primary float-end"
        id="wd-update-assignment-title"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl 
        defaultValue={assignment.title}
        className="form-control w-75"
        id="wd-assignment-title"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />
      <a 
        className="btn btn-primary float-end"
        id="wd-update-assignment-score"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
       <FormControl 
        defaultValue={assignment.score}
        className="form-control w-75"
        id="wd-assignment-score"
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        }
      />
      <hr />

      {/* ========== MODULE SECTION - REQUIRED FOR RUBRIC ========== */}
      <h4>Retrieving Module</h4>
      <a 
        id="wd-retrieve-module" 
        className="btn btn-primary"
        href={MODULE_API_URL}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieving Module Name</h4>
      <a 
        id="wd-retrieve-module-name" 
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      <h4>Modifying Module Name</h4>
      <a 
        className="btn btn-primary float-end"
        id="wd-update-module-name"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <FormControl 
        defaultValue={module.name}
        className="form-control w-75"
        id="wd-module-name"
        onChange={(e) =>
          setModule({ ...module, name: e.target.value })
        }
      />
      <hr />
    </div>
  );
}