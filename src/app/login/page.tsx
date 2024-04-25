"use client";
import Link from "next/link";
import "./login.css";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@/context/authContext";

export default function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.defaults.withCredentials = true; // Asegúrate de que las cookies se incluyan en esta llamada
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        username: userRef.current?.value,
        password: passwordRef.current?.value,
      });
      if (res.data) {
        setUser(res.data);
      }
      if (res.status === 200) {
        router.push("/");
      }
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(true);
    }
  };
  return (
    <div className="login">
      <h1>Inicio de Sesión</h1>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre de usuario" ref={userRef} />
          <input type="password" placeholder="Contraseña" ref={passwordRef} />
          <button className="loginBtn" type="submit">
            Iniciar Sesión
          </button>
          {success && (
            <span className="errorRegistro">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="espacio"
              />
              Usuario o contraseña incorrecto...
            </span>
          )}
          <br />
          <p className="orRegister">
            ¿No tienes cuenta?
            <Link href="/registro" style={{ textDecoration: "none" }}>
              <span className="orRegister orReghover"> Registrate</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
