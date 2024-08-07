"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logout } from "./Logout";
import { useAuth } from "@/context/authContext";

export function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      closeProfileMenu();
    } else {
      setIsLoggedIn(false);
    }

    if (user?.picture) {
      setImagen(user?.picture);
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };
  return (
    <header className="bg-white relative z-50">
      <div className="mx-auto max-w-screen-3xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                src="/logo.png"
                priority
                alt="imagen logo pagina"
                width={1920}
                height={1080}
                className="h-36 w-40"
              />
            </Link>
          </div>

          <div className="hidden md:block float-end">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm  font-semibold">
                <li>
                  <Link
                    className="text-gray-900 transition hover:text-gray-500/75 text-xl"
                    href="/"
                    onClick={closeMenu}
                  >
                    Inicio
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-900 transition hover:text-gray-500/75 text-xl"
                    href="/redactar"
                    onClick={closeMenu}
                  >
                    Redactar
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-900 transition hover:text-gray-500/75 text-xl"
                    href="/contacto"
                    onClick={closeMenu}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="block md:hidden">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-sm rounded-full md:me-0"
                    onClick={toggleProfileMenu}
                  >
                    <Image
                      className="size-12 rounded-full "
                      src={imagen || "/usu.webp"}
                      alt="user photo"
                      width={1280}
                      height={800}
                    />
                  </button>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                      {" "}
                      {/* Establece un z-index alto para el menú del perfil */}
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {user?.role === "admin" && (
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeProfileMenu}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          href="/ajustes"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeProfileMenu}
                        >
                          Ajustes
                        </Link>
                        <Link
                          href={`/perfil/${user?.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeProfileMenu}
                        >
                          Perfil
                        </Link>
                        <Logout />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link
                    className="rounded-md bg-blue-800 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/login"
                  >
                    Identificarse
                  </Link>
                  <Link
                    className="rounded-md bg-sky-100 px-5 py-2.5 text-sm font-medium text-blue-800 hidden md:block"
                    href="/registro"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <nav aria-label="Global">
              <ul className="flex flex-col items-center gap-4 text-sm">
                <li>
                  <Link
                    className="text-gray-900 transition hover:text-gray-500/75 text-xl"
                    href="/"
                    onClick={closeMenu}
                  >
                    Inicio
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-900 transition hover:text-gray-500/75 text-xl"
                    href="/redactar"
                    onClick={closeMenu}
                  >
                    Redactar
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-900 transition hover:text-gray-500/75 text-xl"
                    href="/contacto"
                    onClick={closeMenu}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
