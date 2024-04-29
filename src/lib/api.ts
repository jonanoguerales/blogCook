import { Posts } from "@/lib/interfaces";
import axios from "axios";

export async function getPosts() {
  try {
    const res = await axios.get("http://localhost:3001/api/posts");
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
    const res = await axios.get(`http://localhost:3001/api/posts/${category}`);
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
