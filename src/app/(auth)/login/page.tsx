"use client";
import Link from "next/link";
import "./login.css";
import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";

export default function Login() {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { login } = useAuth();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      username.current &&
      username.current !== null &&
      username.current !== undefined
    ) {
      username.current.value = e.target.value;
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      password.current &&
      password.current !== null &&
      password.current !== undefined
    ) {
      password.current.value = e.target.value;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://apiblog-production-1e4c.up.railway.app/api/auth/login",
        {
          username: username.current?.value,
          password: password.current?.value,
        }
      );
      if (response) {
        const tokens = response.data;
        login(tokens);
        setSuccess(false);
        router.push("/");
      } else {
        setSuccess(true);
      }
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
          <input
            ref={username}
            type="text"
            placeholder="Nombre de usuario"
            onChange={handleUsernameChange}
          />
          <input
            ref={password}
            type="password"
            placeholder="Contraseña"
            onChange={handlePasswordChange}
          />
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
