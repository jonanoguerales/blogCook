"use client";
import React, { useEffect, useState } from "react";
import SidebarDash from "@/components/dashSidebar/SidebarDash";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
const TABLE_HEAD = [
  "ID",
  "Imagen Perfil",
  "Usuario",
  "Nombre",
  "Email",
  "Teléfono",
  "Role",
  "Creación",
  "",
];

function TableUsers() {
  const [users, setUsers] = useState([]);
  const [cambio, setCambio] = useState(false);
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
  const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";
  const handleOpenEliminar = () => setModalEliminar(!modalEliminar);
  const handleOpenActualizar = () => setModalEditar(!modalEditar);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        "https://apiblog-production-1e4c.up.railway.app/api/users"
      );
      const data = res.data;

      // Formatear la fecha de creación en formato 'es-ES'
      data.forEach((user) => {
        user.createdAt = new Date(user.createdAt).toLocaleDateString("es-ES");
      });
      setUsers(data);
    };
    fetchUsers();
  }, [cambio]);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://apiblog-production-1e4c.up.railway.app/api/user/${userSeleccionado._id}`
      );
      // Borrar el token del local storage
      window.localStorage.removeItem(AUTH_TOKENS_KEY);
      setModalEliminar(false);
      setCambio(!cambio);
    } catch (err) {
      console.error("error al eliminarlo", err);
    }
  };

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
        `https://apiblog-production-1e4c.up.railway.app/api/users/${userSeleccionado._id}`,
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
      setCambio(!cambio);
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
      <div className="min-h-screen flex bg-[#1E1E3D]">
        <SidebarDash />
        <div className="w-full overflow-hidden">
          <br />
          <h2 className="text-white text-2xl mt-16">Usuarios registrados</h2>
          <br />
          <Card className="mr-8">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className=" flex items-center justify-between pt-4">
                <div className="w-full md:w-72">
                  <Input
                    label="Buscar"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                    Añadir Usuario
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((elemento, index) => {
                    const isLast = index === users.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={elemento.username}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento._id}
                          </Typography>
                        </td>
                        <td className={`${classes} flex justify-center`}>
                          <Avatar
                            src={elemento.profilePic}
                            alt={elemento.username}
                            size="sm"
                          />
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.username}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.nombre}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.telefono}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.role}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.createdAt}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Editar Usuario">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                seleccionarUser(elemento, "Editar")
                              }
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Borrar usuario">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() =>
                                seleccionarUser(elemento, "Eliminar")
                              }
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page 1 of 1
              </Typography>
              <div className="flex gap-2">
                <Button variant="outlined" size="sm">
                  Anterior
                </Button>
                <Button variant="outlined" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Dialog
        open={modalEliminar}
        handler={handleOpenEliminar}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Borrar Usuario</DialogHeader>
        <DialogBody className="text-xl">
          ¿Estas seguro de que quieres borrar el usuario?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenEliminar}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleDelete}>
            <span>Borrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        size="xs"
        open={modalEditar}
        handler={handleOpenActualizar}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Actualizar Usuario
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nombre
            </Typography>
            <Input
              label="Nombre"
              size="lg"
              type="text"
              name="nombre"
              value={userSeleccionado ? userSeleccionado.nombre : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Usuario
            </Typography>
            <Input
              label="Usuario"
              size="lg"
              type="text"
              name="username"
              value={userSeleccionado ? userSeleccionado.username : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              type="email"
              name="email"
              value={userSeleccionado ? userSeleccionado.email : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Role
            </Typography>
            <Input
              label="Role"
              size="lg"
              type="text"
              name="role"
              value={userSeleccionado ? userSeleccionado.role : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Telefono
            </Typography>
            <Input
              label="Telefono"
              size="lg"
              type="number"
              name="telefono"
              value={userSeleccionado ? userSeleccionado.telefono : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Imagen
            </Typography>
            <Input
              label="Imagen"
              size="lg"
              type="text"
              name="profilePic"
              value={userSeleccionado ? userSeleccionado.profilePic : ""}
              onChange={handleChange}
            />
          </CardBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenActualizar}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={handleUpdate}>
              <span>Actualizar</span>
            </Button>
          </DialogFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default TableUsers;
