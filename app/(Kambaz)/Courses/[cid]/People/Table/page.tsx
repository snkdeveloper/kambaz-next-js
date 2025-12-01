"use client"
import { useState, useEffect } from "react";
import PeopleDetails from "../Details";
import Link from "next/link";
import { Table } from "react-bootstrap";
import * as client from "../../../../Account/client"
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import * as coursesClient from "../../../client";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable({ users = [] ,fetchUsers}: { users?: any[]; fetchUsers: () => void;}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const [usersToDisplay, setUsersToDisplay] = useState<any[]>(users && users.length > 0 ? users : []);

  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        if (users && users.length > 0) {
          if (mounted) setUsersToDisplay(users);
        } else if (courseId) {
          const enrolledUsers = await coursesClient.findUsersForCourse(courseId as string);
          if (mounted) setUsersToDisplay(enrolledUsers || []);
        } else {
          const { users: dbUsers, enrollments } = db as any;
          if (mounted) {
            const usersForCourse = dbUsers.filter((usr: any) =>
              enrollments.some((enr: any) =>
                enr.user === usr._id && (!courseId || enr.course === courseId)
              )
            );
            setUsersToDisplay(usersForCourse);
          }
        }
      } catch (error) {
        console.error("Error loading users for course:", error);
      }
    };
    loadUsers();
    return () => { mounted = false; };
  }, [courseId, users]);

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {(usersToDisplay || [])
            .filter(Boolean)  
            .map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <span className="text-decoration-none"
                        onClick={() => {
                          setShowDetails(true);
                          setShowUserId(user._id);
                        }}>
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">
                      {user.firstName || user.username || user.loginId || user.email || "—"}
                    </span>
                  </span>
                  <span className="wd-last-name">{user.lastName || ""}</span>
                </td>

                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role === "USER" ? "User" : (user.role || "")}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
