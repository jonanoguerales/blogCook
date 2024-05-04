import { ReactNode } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/botonScroll/ScrollBoton";

function LayoutRegistro({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-white mx-auto max-w-screen-3xl"> {children}</main>
      <Footer />
      <ScrollTop />
    </>
  );
}

export default LayoutRegistro;
