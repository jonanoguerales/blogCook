"use client";
import axios from "axios";
import { useState } from "react";
import Commentario from "../comment/Commentario";
import "./comments.css";
import { useAuth } from "@/context/authContext";
import { Post } from "@/lib/interfaces";

const Comments = ({ post }: { post: Post }) => {
  const [comment, setComment] = useState("");
  const [click, setClick] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      name: user && user.username,
      id_post: post._id,
      id_user: user && user.id,
      comment,
    };
    try {
      await axios.post(
        "https://apiblog-production-1e4c.up.railway.app/api/comments",
        newComment
      );
      setClick(!click);
    } catch (err) {
      alert("comentario vacio");
    }
  };
  return (
    <>
      <div className="commentSecti">
        <Commentario post={post as Post} click={click} />
      </div>
      <div className="comments">
        <form className="commentForm" onSubmit={handleSubmit}>
          <span className="commentTittle">Dejar Comentario</span>
          <input
            className="nickComment"
            placeholder="Nombre"
            type="text"
            value={user?.username}
          />
          <textarea
            autoComplete="off"
            className="writeText"
            placeholder="Comentario..."
            typeof="text"
            autoFocus
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="commentBTN" type="submit">
            Dejar comentario
          </button>
        </form>
      </div>
    </>
  );
};

export default Comments;
