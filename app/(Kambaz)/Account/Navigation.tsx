// app/(Kambaz)/Account/AccountNavigation.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/Account/Signin", label: "Sign in" },
    { href: "/Account/Signup", label: "Sign up" },
    { href: "/Account/Profile", label: "Profile" },
  ];

  return (
    <div
      id="wd-account-navigation"
      className="list-group fs-5 rounded-0"
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`list-group-item border-0 ${
            pathname === link.href
              ? "fw-bold text-dark"
              : "text-danger"
          }`}
          style={pathname === link.href ? { backgroundColor: "white" } : {}}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
