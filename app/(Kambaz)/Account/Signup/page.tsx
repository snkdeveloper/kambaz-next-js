"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button, Alert } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      setMessage({ type: "success", text: "Signed up successfully" });
      setTimeout(() => {
        setMessage(null);
        router.push("/Account/Profile");
      }, 1200);
    } catch (e: any) {
      setMessage({ type: "danger", text: e?.response?.data?.message || "Signup failed. Please try again." });
      setTimeout(() => setMessage(null), 2000);
    }
  };
  return (
    <div className="wd-signup-screen">
      {message && (
        <Alert variant={message.type} className="py-2">{message.text}</Alert>
      )}
      <h1>Sign up</h1>
      <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="wd-username b-2" placeholder="username" />
      <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
             className="wd-password mb-2" placeholder="password" type="password"/>
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
      <Link href="/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
);}

