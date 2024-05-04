"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/botonScroll/ScrollBoton";

function LayoutAjustes({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === false) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="bg-white mx-auto max-w-screen-3xl"> {children}</main>
      <Footer />
      <ScrollTop />
    </>
  );
}

export default LayoutAjustes;
