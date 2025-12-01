"use client";
import * as client from "../client"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";
import Link from "next/link";
import { Button, FormControl, Alert } from "react-bootstrap";

export default function SignIn() {
  const [credentials, setCredentials] = useState({ 
    username: "", 
    password: "" 
  });
  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
   const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setMessage({ type: "danger", text: "Invalid username or password" });
        setTimeout(() => setMessage(null), 2000);
        return;
      }
      dispatch(setCurrentUser(user));
      setMessage({ type: "success", text: "Signed in successfully" });
      setTimeout(() => {
        setMessage(null);
        router.push("/Dashboard");
      }, 1200);
    } catch (e) {
      setMessage({ type: "danger", text: "Sign in failed. Please try again." });
      setTimeout(() => setMessage(null), 2000);
    }
  };


  // const handleSignin = () => {
  //   console.log("🔐 Attempting signin with:", credentials.username);
    
  //   const user = db.users.find(
  //     (u: any) => 
  //       u.username === credentials.username && 
  //       u.password === credentials.password
  //   );
    
  //   if (user) {
  //     console.log("✅ User found:", user);
  //     dispatch(setCurrentUser(user));
      
  //     // Small delay to ensure Redux updates
  //     setTimeout(() => {
  //       router.push("/Dashboard");
  //     }, 100);
  //   } else {
  //     console.log("❌ Invalid credentials");
  //     alert("Invalid username or password!");
  //   }
  // };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signin();
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      {message && (
        <Alert variant={message.type} className="py-2">{message.text}</Alert>
      )}
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
        onClick={signin}
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