"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import Link from "next/link";
import { Button, FormControl } from "react-bootstrap";

export default function SignIn() {
  const [credentials, setCredentials] = useState({ 
    username: "", 
    password: "" 
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignin = () => {
    console.log("🔐 Attempting signin with:", credentials.username);
    
    const user = db.users.find(
      (u: any) => 
        u.username === credentials.username && 
        u.password === credentials.password
    );
    
    if (user) {
      console.log("✅ User found:", user);
      dispatch(setCurrentUser(user));
      
      // Small delay to ensure Redux updates
      setTimeout(() => {
        router.push("/Dashboard");
      }, 100);
    } else {
      console.log("❌ Invalid credentials");
      alert("Invalid username or password!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignin();
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3>Sign in</h3>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        onKeyPress={handleKeyPress}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        onKeyPress={handleKeyPress}
      />
      <Button 
        onClick={handleSignin}
        variant="primary"
        className="w-100 mb-2"
        id="wd-signin-btn"
      >
        Sign in
      </Button>
      <Link href="/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}