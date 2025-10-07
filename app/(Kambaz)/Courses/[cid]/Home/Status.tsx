import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaChartBar, FaBell } from "react-icons/fa";
import { BiImport, BiCog } from "react-icons/bi";
import { LiaFileImportSolid, LiaClipboardListSolid } from "react-icons/lia";
import { TbClipboardText } from "react-icons/tb";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>

      {/* Unpublish & Publish Buttons */}
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" />
            Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100">
            <FaCheckCircle className="me-2 fs-5" />
            Publish
          </Button>
        </div>
      </div>

      <br />

      {/* Import/Export and Setup Buttons */}
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </Button>

      {/* ✅ Complete the rest of the buttons */}

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaClipboardListSolid className="me-2 fs-5" />
        Choose Home Page
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <TbClipboardText className="me-2 fs-5" />
        View Course Stream
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <FaChartBar className="me-2 fs-5" />
        New Analytics
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <FaBell className="me-2 fs-5" />
        View Notifications
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <BiCog className="me-2 fs-5" />
        Settings
      </Button>
    </div>
  );
}
