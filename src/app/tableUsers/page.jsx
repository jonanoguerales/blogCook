"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tableUsers.css";
import SidebarDash from "../../components/dashSidebar/SidebarDash";
import Image from "next/image";

function Users() {
  const [users, setUsers] = useState([]);
  const PF = "https://apiblog-01g5.onrender.com/images/";

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
        <div className="tablasContainer">
          <br />
          <h2 className="registerUsersTitle">Usuarios Registrados</h2>
          <br />
          <table className="myTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen Perfil</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>email</th>
                <th>Teléfono</th>
                <th>Role</th>
                <th>Creacion</th>
              </tr>
            </thead>

            <tbody className="tbdoyEdit">
              {users.map((elemento) => (
                <tr key={elemento._id}>
                  <td>{elemento._id.slice(0, 5)}</td>
                  <td>
                    <Image
                      className="imgPost"
                      src={PF + elemento.profilePic}
                      alt="imagen"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>{elemento.username}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.email}</td>
                  <td>{elemento.telefono}</td>
                  <td>{elemento.role}</td>
                  <td>{new Date(elemento.createdAt).toDateString()}</td>
                  <td>
                    <button
                      color="primary"
                      onClick={() => seleccionarUser(elemento, "Editar")}
                    >
                      Editar
                    </button>{" "}
                    <button
                      color="danger"
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
