"use client";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: () => void;
  editModule: () => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={editModule}
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={deleteModule}
        style={{ cursor: "pointer" }}
      />
      <FaCheckCircle className="text-success me-2" />
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}