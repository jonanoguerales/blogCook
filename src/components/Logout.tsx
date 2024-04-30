import { useAuth } from "@/context/authContext";
import Link from "next/link";

export function Logout() {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout} className="w-full text-start">
        <Link
          href="/login"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Cerrar sesión
        </Link>
      </button>
    </div>
  );
}
