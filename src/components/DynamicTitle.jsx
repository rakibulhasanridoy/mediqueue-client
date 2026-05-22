"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const routeTitles = {
  "/": "Home | MediQueue",
  "/tutors": "Find Tutors | MediQueue",
  "/add-tutor": "Add Tutor | MediQueue",
  "/my-tutors": "My Tutors | MediQueue",
  "/dashboard": "My Bookings | MediQueue",
  "/login": "Login | MediQueue",
  "/register": "Register | MediQueue",
};

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    let title = "MediQueue – Tutor Booking System";
    
    // Check direct matching routes
    if (routeTitles[pathname]) {
      title = routeTitles[pathname];
    } else if (pathname.startsWith("/tutors/")) {
      // Dynamic tutor details path
      title = "Tutor Details | MediQueue";
    } else if (pathname !== null) {
      // General fallbacks
      const cleanPath = pathname.split("/").filter(Boolean).pop();
      if (cleanPath) {
        title = `${cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1)} | MediQueue`;
      }
    }
    
    document.title = title;
  }, [pathname]);

  return null; // Side-effect only component
}
