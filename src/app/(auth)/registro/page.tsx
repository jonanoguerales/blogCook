"use client";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Errors = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function Registro() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validarPassword = () => {
    if (password.length > 0) {
      if (password === repeatPassword) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return true;
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case "username":
        setUsername(value);
        newErrors.username =
          value.length < 3
            ? "El nombre de usuario debe tener al menos 3 caracteres."
            : "";
        break;
      case "email":
        setEmail(value);
        newErrors.email = !validateEmail(value)
          ? "El correo electrónico no es válido."
          : "";
        break;
      case "password":
        setPassword(value);
        newErrors.password =
          value.length < 6
            ? "La contraseña debe tener al menos 6 caracteres."
            : "";
        break;
      case "repeatpassword":
        setRepeatPassword(value);
        newErrors.repeatPassword =
          value.length < 0 ? "La contraseña no coincide." : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validarPassword()) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const formData = {
      username: username,
      email: email,
      password: password,
      nombre: nombre,
      telefono: telefono,
      passwordSec: repeatPassword,
    };

    try {
      const response = await axios.post(
        "https://apiblog-production-1e4c.up.railway.app/api/auth/register",
        formData
      );

      if (response.status === 200) {
        router.push("/login");
      } else {
        const errorData = response.data;
        if (errorData.message && errorData.message.includes("username")) {
          alert("El nombre de usuario ya existe. Por favor, elige otro.");
        } else {
          console.error("Error en el registro:", errorData.message);
          alert(
            "Ha ocurrido un error en el registro. Inténtalo de nuevo más tarde."
          );
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert(
        "Ha ocurrido un error al registrarse. Inténtalo de nuevo más tarde."
      );
    }
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:grid-cols-12 min-h-[calc(100vh-180px)]">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Imagen fondo"
            src="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714743978/fondo-registro.webp"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            width={1280}
            height={720}
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Bienvenido a Blog[Cook] 🦑
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Una pagina llena de recetas, donde podras encontrar platos para
              cada día.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-20 sm:-mt-24 block lg:hidden">
              <a
                className="inline-flex size-24 items-center justify-center rounded-full bg-white text-blue-600 sm:size-32"
                href="#"
              >
                <span className="sr-only">Home</span>
                <Image
                  src="/logo.png"
                  alt="imagen logo pagina"
                  width={1920}
                  height={1080}
                  className="h-36 w-40"
                />
              </a>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Bienvenido a Blog[Cook] 🦑
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Una pagina llena de recetas, donde podras encontrar platos para
                cada día.
              </p>
            </div>

            <form
              className="max-w-lg mx-auto flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      htmlFor="username"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nombre de usuario
                    </label>
                    {errors.username && (
                      <span className="error">{errors.username}</span>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <label
                      htmlFor="nombre"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nombre
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Contraseña
                    </label>
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="password"
                      name="repeatPassword"
                      id="repeatPassword"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <label
                      htmlFor="repeatPassword"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Confirmar contraseña
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Correo
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="telefono"
                    id="telefono"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={(event) => setTelefono(event.target.value)}
                  />
                  <label
                    htmlFor="telefono"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Teléfono (opcional)
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    Quiero recibir correos electrónicos sobre eventos,
                    actualizaciones de productos y anuncios de la empresa.
                  </span>
                </label>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Al crear una cuenta, usted acepta nuestros
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    términos y condiciones{" "}
                  </a>
                  y
                  <a href="#" className="text-gray-700 underline">
                    política de privacidad
                  </a>
                  .
                </p>
              </div>
              <div className="sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Crear una cuenta
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  ¿Ya tienes una cuenta?
                  <Link href="/login" className="text-gray-700 underline ml-1">
                    Identificarse
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
