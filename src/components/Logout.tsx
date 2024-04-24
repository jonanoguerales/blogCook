"use client";
import axios from "axios";

export function Logout() {
  const logout = async () => {
    axios.defaults.withCredentials = true;
    try {
      await axios.post("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button onClick={() => logout()}>Cerrar sesión</button>
    </div>
  );
}
