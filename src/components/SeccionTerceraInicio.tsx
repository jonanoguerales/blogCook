"use client";
import { useEffect, useState } from "react";
import { CardPost } from "./cardPost";
import { Paginacion } from "./paginacion";
import { SiderBar } from "./sideBar";
import { Posts } from "@/lib/interfaces";

export default function SeccionTerceraInicio() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = async () => {
      const res = await fetch("http://localhost:3001/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    posts();
  }, []);

  return (
    <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="  bg-white lg:col-span-2 flex flex-col gap-8">
          <h2 className="text-2xl font-bold">Artículos mas recientes</h2>
          {posts.map((post: Posts) => (
            <CardPost
              key={post._id}
              titulo={post.title}
              parrafo={post.desc}
              img={post.photo}
              categoria={post.categories}
              autor={post.username}
              fecha={post.createdAt}
              bg="bg-red-500"
            />
          ))}
          <Paginacion />
        </div>
        <div className="flex flex-col gap-8 bg-white">
          <SiderBar />
        </div>
      </div>
    </section>
  );
}
