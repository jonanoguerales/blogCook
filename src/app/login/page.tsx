import Link from "next/link";
import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <h1>Inicio de Sesión</h1>
      <div className="loginForm">
        <form>
          <input type="text" placeholder="Nombre de usuario" />
          <input type="password" placeholder="Contraseña" />
          <button className="loginBtn" type="submit">
            Iniciar Sesión
          </button>

          <span className="errorRegistro">
            Usuario o contraseña incorrecto...
          </span>

          <br />
          <p className="orRegister">
            ¿No tienes cuenta?
            <Link href="registro" style={{ textDecoration: "none" }}>
              <span className="orRegister orReghover"> Registrate</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
