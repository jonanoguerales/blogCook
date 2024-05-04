"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import ScrollTop from "@/components/botonScroll/ScrollBoton";
import Footer from "@/components/footer/Footer";

function LayoutRedactar({ children }: { children: ReactNode }) {
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

export default LayoutRedactar;
