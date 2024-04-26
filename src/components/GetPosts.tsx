import { Posts } from "@/lib/interfaces";

export async function getPosts() {
  try {
    const res = await fetch("http://localhost:3001/api/posts");
    if (!res.ok) {
      throw new Error(
        `Error al obtener los posts: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();

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
