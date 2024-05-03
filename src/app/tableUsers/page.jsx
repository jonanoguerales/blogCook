"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tableUsers.css";
import SidebarDash from "../../components/dashSidebar/SidebarDash";
import Image from "next/image";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "https://apiblog-01g5.onrender.com/api/users"
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [userSeleccionado, setUserSeleccionado] = useState({
    _id: "",
    username: "",
    nombre: "",
    email: "",
    role: "",
    telefono: "",
    profilePic: "",
  });

  const handleUpdate = async () => {
    try {
      const dataNueva = users;
      dataNueva.map((user) => {
        if (user._id === userSeleccionado._id) {
          user.username = userSeleccionado.username;
          user.nombre = userSeleccionado.nombre;
          user.email = userSeleccionado.email;
          user.role = userSeleccionado.role;
          user.telefono = userSeleccionado.telefono;
          user.profilePic = userSeleccionado.profilePic;
        }
        return dataNueva;
      });
      setUsers(dataNueva);

      await axios.put(
        `https://apiblog-01g5.onrender.com/api/user/${userSeleccionado._id}`,
        {
          username: userSeleccionado.username,
          nombre: userSeleccionado.nombre,
          email: userSeleccionado.email,
          role: userSeleccionado.role,
          telefono: userSeleccionado.telefono,
          profilePic: userSeleccionado.profilePic,
        }
      );
      setModalEditar(false);
    } catch (err) {}
  };

  const handleDelete = async () => {
    try {
      setUsers(users.filter((user) => user._id !== userSeleccionado._id));
      await axios.delete(
        `https://apiblog-01g5.onrender.com/api/users/${userSeleccionado._id}`,
        {
          data: { username: userSeleccionado._id },
        }
      );
      setModalEliminar(false);
    } catch (err) {}
  };

  const seleccionarUser = (elemento, caso) => {
    setUserSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="tablas">
        <SidebarDash />
        <div className="tablasContainer">
          <br />
          <h2 className="registerUsersTitle">Usuarios Registrados</h2>
          <br />
          <table className="myTable mr-5">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Imagen Perfil</th>
                <th className="py-2">Usuario</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">email</th>
                <th className="py-2">Teléfono</th>
                <th className="py-2">Role</th>
                <th className="py-2">Creacion</th>
              </tr>
            </thead>

            <tbody className="tbdoyEdit">
              {users.map((elemento) => (
                <tr key={elemento._id}>
                  <td className="pl-2">{elemento._id.slice(0, 5)}</td>
                  <td className="py-2 flex justify-center h-[100px] items-center">
                    <Image
                      className="imgPost"
                      src={elemento.profilePic}
                      alt="imagen"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td className="text-left px-2">{elemento.username}</td>
                  <td className="text-left px-2">{elemento.nombre}</td>
                  <td className="text-left px-2">{elemento.email}</td>
                  <td className="text-left px-2">{elemento.telefono}</td>
                  <td className="text-left px-2">{elemento.role}</td>
                  <td className="text-left px-2">
                    {new Date(elemento.createdAt).toDateString()}
                  </td>
                  <td>
                    <button
                      className="bg-blue-700 p-2 rounded-lg my-2"
                      onClick={() => seleccionarUser(elemento, "Editar")}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="bg-red-700 p-2 rounded-lg m-2"
                      onClick={() => seleccionarUser(elemento, "Eliminar")}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
