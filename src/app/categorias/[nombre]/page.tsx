import { Posts } from "@/lib/interfaces";
import axios from "axios";

const getPostsCategoria = async (nombre: string) => {
  try {
    const res = await axios.get(`http://localhost:3001/api/posts/${nombre}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw new Error("Error al obtener los posts");
  }
};
export default async function Categorias({
  params: { nombre },
}: {
  params: { nombre: string };
}) {
  const posts = await getPostsCategoria(nombre);

  return (
    <>
      {posts.map((post: Posts) => (
        <p>{post.categories}</p>
      ))}
    </>
  );
}
