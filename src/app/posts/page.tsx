import { getPosts } from "@/components/GetPosts";
import { PostsObtenidos } from "@/components/ObtenerPosts";

export async function PostsTotales() {
  const posts = await getPosts();
  return <PostsObtenidos posts={posts} />;
}
