"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { ReactNode } from "react";

function LayoutPerfil({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === false) {
    redirect("/login");
  }

  return <div>{children}</div>;
}

export default LayoutPerfil;
