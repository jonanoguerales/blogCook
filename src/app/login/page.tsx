"use client";
import Link from "next/link";
import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";

export default function Login() {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try {
      const respuesta = await login(username, password);
      if (!respuesta) {
        setSuccess(true);
      } else {
        setSuccess(false);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <h1>Inicio de Sesión</h1>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre de usuario" onChange={handleUsernameChange} />
          <input type="password" placeholder="Contraseña" onChange={handlePasswordChange} />
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
