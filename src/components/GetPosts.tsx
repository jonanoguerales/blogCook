"use client";
import React, { useEffect, useState } from "react";
import { Posts } from "@/lib/interfaces";
import { CardPost } from "./CardPost";
import { getPosts } from "@/lib/api"; // Importar la función getPosts desde el archivo api.ts

export function GetPosts() {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts(); // Utilizar la función getPosts para obtener los posts
        setPosts(data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    fetchPosts();
  }, []);

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

