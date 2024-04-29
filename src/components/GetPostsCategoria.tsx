"use client";
import React, { useEffect, useState } from "react";
import { Posts } from "@/lib/interfaces";
import { CardPost } from "./CardPost";
import { getPostsCategorias } from "@/lib/api";

export function GetPostsCategoria({ category }: { category: string }) {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getPostsCategorias(category);
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

