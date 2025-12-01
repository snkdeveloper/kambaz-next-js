"use client";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../../Courses/[cid]/People/Table/page"
import * as client from "../../Account/client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user].filter(Boolean));
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users.filter(Boolean));
    } else {
      fetchUsers();
    }
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users.filter(Boolean));
    } else {
      fetchUsers();
    }
  };

  const { uid } = useParams();

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    console.log("🔎 findAllUsers result:", users);

    const visible = (users || [])
      .filter(Boolean) // <-- FIX NULL
      .filter((u: any) =>
        u.firstName || u.lastName || u.username || u.loginId || u.email
      );

    setUsers(visible);
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <button onClick={createUser}
        className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>

      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role">
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
