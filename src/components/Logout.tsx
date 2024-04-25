import { AuthContext } from "@/context/authContext";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";

export function Logout() {
  const { setUser } = useContext(AuthContext);
  const logout = async () => {
    axios.defaults.withCredentials = true;
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={() => logout()} className="w-full text-start">
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
