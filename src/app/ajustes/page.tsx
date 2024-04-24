"use client";
import React, { useState, useContext } from "react";
import "./settings.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importamos el componente para poder utilizar los iconos
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"; // El icono o iconos a utilizar
import { useAuth } from "@/context/authContext";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const PF = "https://apiblog-01g5.onrender.com/images/";

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://apiblog-01g5.onrender.com/api/users/${user?.id}`,
        {
          data: { username: user?.username },
        }
      );
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = {
      userId: user?.id,
      username,
      email,
      password,
      nombre,
      telefono,
      profilePic: "",
    };
    if (file) {
      const data = new FormData();
      const filename = "asd";
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("https://apiblog-01g5.onrender.com/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        "https://apiblog-01g5.onrender.com/api/users/" + user?.id,
        updatedUser
      );
      setSuccess(true);
    } catch (err) {}
  };
  return (
    <>
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">Actualizar tu cuenta</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <div className="settingsPP">
              <img src={user?.username} alt="" />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon">
                  <FontAwesomeIcon icon={faUserCircle} />
                </i>
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                className="settingsPPInput"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <label>Nombre de usuario</label>
            <input
              type="text"
              required
              placeholder={user?.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder={user?.username}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user?.username}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Contraseña</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Teléfono</label>
            <input
              type="text"
              placeholder={user?.username}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <button className="settingsSubmitButton" type="submit">
              Actualizar
            </button>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                El perfil ha sido actualizado...
              </span>
            )}
          </form>
          <span className="settingsTitleDelete" onClick={handleDelete}>
            o borrar cuenta
          </span>
        </div>
      </div>
    </>
  );
};

export default Settings;
