"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap mb-3">
      <Button
        className="me-1 float-end"
        size="lg"
        variant="danger"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      <Button className="me-1 float-end" variant="secondary" size="lg">
        Collapse All
      </Button>
      <Button className="me-1 float-end" variant="secondary" size="lg">
        View Progress
      </Button>
      <div className="dropdown d-inline me-1 float-end">
        <Button variant="secondary" size="lg">
          Publish All
        </Button>
      </div>
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}