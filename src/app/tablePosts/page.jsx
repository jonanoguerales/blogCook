"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "./tablePosts.css";
import Image from "next/image";
import SidebarDash from "@/components/dashSidebar/SidebarDash";

function Posts() {
  const [posts, setPosts] = useState([]);
  const PF = "https://apiblog-01g5.onrender.com/images/";

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://apiblog-01g5.onrender.com/api/posts"
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

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
        `https://apiblog-01g5.onrender.com/api/post/${postSeleccionado._id}`,
        {
          data: { username: postSeleccionado._id },
        }
      );
      setModalEliminar(false);
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
      <div className="tablas">
        <SidebarDash />
        <div className="tablasContainer">
          <br />
          <h2 className="registerPostsTitle">Posts Registrados</h2>
          <br />
          <table className="myTable mr-5">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Imagen Post</th>
                <th className="py-2">Titulo</th>
                <th className="py-2">Usuario</th>
                <th className="py-2">Categoria</th>
                <th className="py-2">Descripcion</th>
                <th className="py-2">Creacion</th>
              </tr>
            </thead>

            <tbody className="tbdoyEdit">
              {posts.map((elemento) => (
                <tr key={elemento._id}>
                  <td className="pl-2">{elemento._id.slice(0, 5)}</td>
                  <td className="py-2 flex justify-center h-[100px] items-center">
                    <Image
                      className="imgPost"
                      src={elemento.photo}
                      alt="imagen photo"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="text-left px-2">{elemento.title}</td>
                  <td className="text-left px-2">{elemento.username}</td>
                  <td className="text-left px-2">{elemento.categories}</td>
                  <td className="text-left px-2">
                    {elemento.desc.slice(0, 20)}
                  </td>
                  <td className="px-2">
                    {new Date(elemento.createdAt).toDateString()}
                  </td>
                  <td>
                    <button
                      className="bg-blue-700 p-2 rounded-lg my-2"
                      onClick={() => seleccionarPost(elemento, "Editar")}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="bg-red-700 p-2 rounded-lg m-2"
                      onClick={() => seleccionarPost(elemento, "Eliminar")}
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

export default Posts;
