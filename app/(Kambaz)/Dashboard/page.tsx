"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/[cid]/reducer";
import { RootState } from "../store";
import * as api from "../Courses/client";
import { FormControl, Card, CardBody, CardImg, CardText, CardTitle, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";

export default function Dashboard() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "New Description",
  });

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  // Fetch all courses and enrolled courses for current user
  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const allCourses = await api.findAllCourses();
      dispatch(setCourses(allCourses));

      const myCourses = await api.findMyCourses();
      setEnrolledCourses(myCourses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => enrolledCourses.some((e) => e._id === c._id));

  const isEnrolled = (courseId: string) => enrolledCourses.some((c) => c._id === courseId);

  // Enrollment handlers
  const handleEnroll = async (courseId: string) => {
    if (!currentUser) {
      alert("You must be logged in to enroll");
      return;
    }
    try {
      await api.enrollInCourse(courseId);
      fetchCourses();
    } catch (err) {
      console.error("Enroll error:", err);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await api.unenrollFromCourse(courseId);
      fetchCourses();
    } catch (err) {
      console.error("Unenroll error:", err);
    }
  };

  // Course management handlers
  const handleAddCourse = async () => {
    try {
      const newCourse = await api.createCourse(course);
      fetchCourses();
      setCourse({ ...course, _id: newCourse._id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      await api.updateCourse(course);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await api.deleteCourse(courseId);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
      </div>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          onClick={handleAddCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={handleUpdateCourse}
        >
          Update
        </button>
      </h5>
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c) => (
            <Col key={c._id} style={{ width: "300px" }}>
              <Card>
                <CardImg
                  src={c.img}
                  variant="top"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText style={{ height: "100px", overflow: "hidden" }}>
                    {c.description}
                  </CardText>

                  <Button variant="primary" as={Link} href={`/Courses/${c._id}/Home`}>
                    Go
                  </Button>

                  {isEnrolled(c._id) ? (
                    <button
                      onClick={(e) => { e.preventDefault(); handleUnenroll(c._id); }}
                      className="btn btn-danger float-end ms-2"
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button
                      onClick={(e) => { e.preventDefault(); handleEnroll(c._id); }}
                      className="btn btn-success float-end ms-2"
                    >
                      Enroll
                    </button>
                  )}

                  <button
                    onClick={() => setCourse(c)}
                    className="btn btn-warning float-end me-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteCourse(c._id)}
                    className="btn btn-danger float-end ms-2"
                  >
                    Delete
                  </button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
