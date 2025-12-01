"use client";
import * as client from "../client"
import { useRouter } from "next/navigation";
import { UseDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";


import { Button, FormControl, Alert } from "react-bootstrap";


export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  // Initialize with all fields as empty strings to avoid undefined
  const [profile, setProfile] = useState({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "STUDENT",
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    
    // Populate profile with current user data, ensuring no undefined values
    setProfile({
      _id: currentUser._id || "",
      username: currentUser.username || "",
      password: currentUser.password || "",
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      dob: currentUser.dob || "",
      email: currentUser.email || "",
      role: currentUser.role || "STUDENT",
    });
  }, [currentUser, router]);

  const signout = async() => {
    try {
      await client.signout();
    } finally {
      dispatch(setCurrentUser(null));
      setMessage({ type: "success", text: "Signed out successfully" });
      setTimeout(() => {
        setMessage(null);
        router.push("/Account/Signin");
      }, 1000);
    }
  };

  const handleSave = () => {
    dispatch(setCurrentUser(profile));
    setMessage({ type: "success", text: "Saved successfully" });
    setTimeout(() => setMessage(null), 1500);
  
  };

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      // Merge to prevent disappearing fields if server omits some (e.g., password)
      const merged = { ...profile, ...updatedProfile } as any;
      dispatch(setCurrentUser(merged));
      setProfile(merged as any);
      setMessage({ type: "success", text: "Updated successfully" });
      setTimeout(() => setMessage(null), 1500);
    } catch (e) {
      setMessage({ type: "danger", text: "Update failed. Please try again." });
      setTimeout(() => setMessage(null), 2000);
    }
  };

  return (
    <div className="wd-profile-screen p-4">
      <h3>Profile</h3>
      {message && (
        <Alert variant={message.type} className="py-2">{message.text}</Alert>
      )}
      {currentUser && (
        <div>
          <FormControl
            value={profile.username}
            id="wd-username"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="Username"
          />
          <FormControl
            value={profile.password}
            id="wd-password"
            type="password"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="Password"
          />
          <FormControl
            value={profile.firstName}
            id="wd-firstname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First Name"
          />
          <FormControl
            value={profile.lastName}
            id="wd-lastname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last Name"
          />
          <FormControl
            value={profile.dob}
            id="wd-dob"
            type="date"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            value={profile.email}
            id="wd-email"
            type="email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          
          <Button 
            onClick={handleSave} 
            className="w-100 mb-2"
            variant="primary"
          >
            Save
          </Button>
           <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <Button 
            onClick={signout} 
            className="w-100" 
            id="wd-signout-btn"
            variant="danger"
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}