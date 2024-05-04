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
  "Imagen Post",
  "Titulo",
  "Usuario",
  "Categoria",
  "Descripcion",
  "Creación",
  "",
];

function TablePosts() {
  const [posts, setPosts] = useState([]);
  const [cambio, setCambio] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [postSeleccionado, setPostSeleccionado] = useState({
    _id: "",
    username: "",
    photo: "",
    title: "",
    desc: "",
    categories: "",
  });
  const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";
  const handleOpenEliminar = () => setModalEliminar(!modalEliminar);
  const handleOpenActualizar = () => setModalEditar(!modalEditar);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://apiblog-01g5.onrender.com/api/posts"
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleUpdate = async () => {
    try {
      const dataNueva = posts;
      dataNueva.map((post) => {
        if (post._id === postSeleccionado._id) {
          post.username = postSeleccionado.username;
          post.title = postSeleccionado.title;
          post.desc = postSeleccionado.desc;
          post.categories = postSeleccionado.categories;
          post.photo = postSeleccionado.photo;
        }
        return post;
      });
      setPosts(dataNueva);

      await axios.put(
        `https://apiblog-01g5.onrender.com/api/post/${postSeleccionado._id}`,
        {
          username: postSeleccionado.username,
          title: postSeleccionado.title,
          desc: postSeleccionado.desc,
          categories: postSeleccionado.categories,
          photo: postSeleccionado.photo,
        }
      );
      setModalEditar(false);
    } catch (err) {}
  };

  const handleDelete = async () => {
    try {
      setPosts(posts.filter((post) => post._id !== postSeleccionado._id));
      await axios.delete(
        `https://apiblog-01g5.onrender.com/api/post/${postSeleccionado._id}`
      );
      setModalEliminar(false);
      setCambio(!cambio);
    } catch (err) {}
  };

  const seleccionarPost = (elemento, caso) => {
    setPostSeleccionado(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostSeleccionado((prevState) => ({
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
          <h2 className="text-white text-2xl mt-16">Posts registrados</h2>
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
                    Añadir Post
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
                  {posts.map((elemento, index) => {
                    const isLast = index === posts.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={elemento._id}>
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
                            src={elemento.photo}
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
                            {elemento.title}
                          </Typography>
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
                            {elemento.categories}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {elemento.desc.slice(0, 20)}
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
                          <Tooltip content="Editar receta">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                seleccionarPost(elemento, "Editar")
                              }
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Borrar receta">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() =>
                                seleccionarPost(elemento, "Eliminar")
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
        <DialogHeader>Borrar Receta</DialogHeader>
        <DialogBody className="text-xl">
          ¿Estas seguro de que quieres borrar la receta?
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
              Actualizar Receta
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Titulo
            </Typography>
            <Input
              label="Titulo"
              size="lg"
              type="text"
              name="title"
              value={postSeleccionado ? postSeleccionado.title : ""}
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
              value={postSeleccionado ? postSeleccionado.username : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Categoria
            </Typography>
            <Input
              label="Categoria"
              size="lg"
              type="text"
              name="categories"
              value={postSeleccionado ? postSeleccionado.categories : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Descripcion
            </Typography>
            <Input
              label="Descripcion"
              size="lg"
              type="text"
              name="desc"
              value={postSeleccionado ? postSeleccionado.desc : ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Imagen
            </Typography>
            <Input
              label="Imagen"
              size="lg"
              type="text"
              name="photo"
              value={postSeleccionado ? postSeleccionado.photo : ""}
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

export default TablePosts;
