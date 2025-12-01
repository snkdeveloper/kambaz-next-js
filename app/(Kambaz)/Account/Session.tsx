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
      // If no active session, don't overwrite existing local user
      console.log("No active session; preserving local user if present");
      // Intentionally avoid dispatching null here to keep localStorage user
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return <>{children}</>;
}