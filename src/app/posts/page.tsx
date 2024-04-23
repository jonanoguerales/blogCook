import { CardPost } from "@/components/CardPost";
import { Posts } from "@/lib/interfaces";

async function getPosts() {
  const res = await fetch("http://localhost:3001/api/posts");
  const data = await res.json();
  return data;
}

export async function PostsObtenidos() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post: Posts) => (
        <CardPost
          key={post._id}
          id={post._id}
          titulo={post.title}
          parrafo={post.desc}
          img={post.photo}
          categoria={post.categories}
          autor={post.username}
          fecha={post.createdAt}
          bg="bg-red-500"
        />
      ))}
    </>
  );
}
