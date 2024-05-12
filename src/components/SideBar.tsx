"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CardPopulares } from "./CardPopulares";
import { CardUsuariosPopular } from "./CardUsuariosPopular";
import { Posts, User } from "@/lib/interfaces";
import { getPosts } from "@/lib/api";

export function SiderBar() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://apiblog-production-1e4c.up.railway.app/api/users"
        );
        const data = res.data;
        const usersWithPosts = data.filter((user: User) => user.numPosts >= 0);
        const topUsers = usersWithPosts
          .sort((a: User, b: User) => b.numPosts - a.numPosts)
          .slice(0, 3);
        setUsers(topUsers);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        const topPosts = data
          .sort((a: Posts, b: Posts) => b.numLikes - a.numLikes)
          .slice(0, 3);
        const postsWithShortDescription = topPosts.map((post: Posts) => {
          const descriptionWords = post.desc.split(" ");
          const shortDescription = descriptionWords.slice(0, 10).join(" ");
          return {
            ...post,
            shortDescription,
          };
        });
        setPosts(postsWithShortDescription);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <article className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Artículos Populares</h2>
        {posts.map((post: Posts) => (
          <CardPopulares
            key={post._id}
            id={post._id}
            bg={post.bg}
            categoria={post.categories}
            title={post.title}
            parrafo={post.shortDescription}
            autor={post.username}
            fecha={post.createdAt}
            likes={post.numLikes}
          />
        ))}
      </article>
      <article className="flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold">Usuarios Populares</h2>
        {users.map((user: User) => (
          <CardUsuariosPopular
            key={user._id}
            id={user._id}
            img={user.profilePic}
            usuario={user.username}
            comentarios={user.numComentarios}
            posts={user.numPosts}
            likes={user.numLikes}
          />
        ))}
      </article>
    </>
  );
}
