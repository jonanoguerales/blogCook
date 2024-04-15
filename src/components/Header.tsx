import Link from "next/link";

export function Header() {
    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-3xl px-4 sm:px-6 lg:px-8 pt-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" href="http://localhost:3000/">
                            <span className="sr-only">Home</span>
                            <img src="/logo.png" alt="imagen logo pagina" width={1920} height={1080} className="h-36 w-40" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-900 transition hover:text-gray-500/75 text-xl" href="/"> Inicio </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-900 transition hover:text-gray-500/75 text-xl" href="redactar"> Redactar </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-900 transition hover:text-gray-500/75 text-xl" href="contacto"> Contacto </Link>
                                </li>

                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-4">
                            <a
                                className="rounded-md bg-blue-800 px-5 py-2.5 text-sm font-medium text-white shadow"
                                href="#"
                            >
                                Identificarse
                            </a>
                            <a
                                className="rounded-md bg-sky-100 px-5 py-2.5 text-sm font-medium text-blue-800"
                                href="#"
                            >
                                Registrarse
                            </a>
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}