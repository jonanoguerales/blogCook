"use client";
import Link from "next/link";
import "./login.css";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "@/context/Context";
import { redirect } from "next/navigation";
import { serialize } from "cookie";

export default function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(Context);
  const [success, setSuccess] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userRef.current?.value, passwordRef.current?.value);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        username: userRef.current?.value,
        password: passwordRef.current?.value,
      });
      setAccessToken(res.data);
      const serialized = serialize("accessToken", res.data, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
      });
      document.cookie = serialized;
      console.log(res.data);
    } catch (err) {
      console.log(err);
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
              {/*<FontAwesomeIcon
                icon={faExclamationTriangle}
                className="espacio"
              />*/}
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
