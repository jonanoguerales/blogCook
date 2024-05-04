"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { ReactNode } from "react";
import { ThemeProvider } from "@material-tailwind/react";

function LayoutDashboard({ children }: { children: ReactNode }) {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn === false || user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <ThemeProvider>
      <div>{children}</div>
    </ThemeProvider>
  );
}
export default LayoutDashboard;
