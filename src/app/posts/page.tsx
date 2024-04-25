import { PostsObtenidos } from "@/components/ObtenerPosts";

async function getPosts() {
  const res = await fetch("http://localhost:3001/api/posts");
  const data = await res.json();
  return data;
}

export async function PostsTotales() {
  const posts = await getPosts();
  return (
    <PostsObtenidos posts={posts} />
  );
} 