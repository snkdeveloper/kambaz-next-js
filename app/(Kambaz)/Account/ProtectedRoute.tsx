"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to allow Redux to load from localStorage
    const timer = setTimeout(() => {
      setIsChecking(false);
      
      // Only redirect if still no user after checking
      if (!currentUser) {
        router.push("/Account/SignIn");
      }
    }, 100); // 100ms delay to let localStorage load

    return () => clearTimeout(timer);
  }, [currentUser, router]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If no user after checking, don't render (will redirect)
  if (!currentUser) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}