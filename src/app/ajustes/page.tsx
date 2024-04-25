"use client";
import React, { useState, useContext, useEffect } from "react";
import "./settings.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/authContext";
import { User } from "@/lib/interfaces";
import { getUsers } from "../perfil/[id]/page";
import Image from "next/image";

const Settings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const [userId, setUserId] = useState<User | null>();
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers(user?.id ?? "");
        setUserId(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [user?.id]);

  useEffect(() => {
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [file]);

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
      data.append("file", file);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        const datajson = await response.json();
        updatedUser.profilePic = datajson.url;
      } catch (err) {
        console.error(err);
        return;
      }
    }
    try {
      await axios.put(
        `https://apiblog-01g5.onrender.com/api/user/${user?.id}`,
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
              <Image
                src={file ? previewUrl : userId ? userId.profilePic : ""}
                width={320}
                height={320}
                alt="foto perfil"
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon">
                  <FontAwesomeIcon icon={faUserCircle} />
                </i>
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0] instanceof File) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <label>Nombre de usuario</label>
            <input
              type="text"
              required
              placeholder={userId?.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder={userId?.nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={userId?.email}
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
              placeholder={userId?.telefono}
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
