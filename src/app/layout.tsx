import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import AuthContextProvider from "@/context/authContext";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/botonScroll/ScrollBoton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog[Cook]",
  description: "Blog de recetas de cocina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header />
          <main className="bg-white mx-auto max-w-screen-3xl"> {children}</main>
          <Footer />
          <ScrollTop />
        </AuthContextProvider>
      </body>
    </html>
  );
}
