"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (error: any) {
      // ✅ Don't throw error - user just isn't logged in
      console.log("No active session");
      dispatch(setCurrentUser(null));
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return <>{children}</>;
}