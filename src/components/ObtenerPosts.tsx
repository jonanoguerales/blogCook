import { CardPost } from "@/components/CardPost";
import { Posts } from "@/lib/interfaces";

export async function PostsObtenidos({ posts }: { posts: Posts[] }) {
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
                    bg={post.bg}
                />
            ))}
        </>
    );
}