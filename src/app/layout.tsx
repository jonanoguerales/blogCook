import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { ContextProvider } from "@/context/Context";
import AuthProvider from "@/auth/authProvider";

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
        <ContextProvider>
          <AuthProvider>
            <Header />
            <main className="bg-white mx-auto max-w-screen-3xl"> {children}</main>
            <footer className="bg-slate-800 p-8">Footer</footer>
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
