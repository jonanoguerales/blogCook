import { Posts } from "@/lib/interfaces";
import axios from "axios";
import { User } from "@/lib/interfaces";

export async function getPosts() {
  try {
    const res = await axios.get("https://apiblog-01g5.onrender.com/api/posts");
    if (res.status !== 200) {
      throw new Error(
        `Error al obtener los posts: ${res.status} ${res.statusText}`
      );
    }
    const data = res.data;

    // Formatear la fecha de creación en formato 'es-ES'
    data.forEach((post: Posts) => {
      post.createdAt = new Date(post.createdAt).toLocaleDateString("es-ES");
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPostsCategorias(category: string) {
  try {
    const res = await axios.get(
      `https://apiblog-01g5.onrender.com/api/posts/${category}`
    );
    if (res.status !== 200) {
      throw new Error(
        `Error al obtener los posts de categoria: ${res.status} ${res.statusText}`
      );
    }
    const data = res.data;

    // Formatear la fecha de creación en formato 'es-ES'
    data.forEach((post: Posts) => {
      post.createdAt = new Date(post.createdAt).toLocaleDateString("es-ES");
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(id: string) {
  try {
    const res = await axios.get(
      `https://apiblog-01g5.onrender.com/api/user/${id}`
    );
    if (res.status !== 200) {
      throw new Error(
        `Error al obtener el usuario: ${res.status} ${res.statusText}`
      );
    }
    const data: User = res.data;

    const user = {
      ...data,
      createdAt: new Date(data.createdAt).toLocaleDateString("es-ES"),
    };

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getComentarios(id: string) {
  try {
    const res = await axios.get(
      "https://apiblog-01g5.onrender.com/api/comments"
    );
    if (res.status !== 200) {
      throw new Error(
        `Error al obtener comentarios: ${res.status} ${res.statusText}`
      );
    }
    const data: User = res.data;

    const user = {
      ...data,
      createdAt: new Date(data.createdAt).toLocaleDateString("es-ES"),
    };

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
