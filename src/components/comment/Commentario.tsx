"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "./commentario.css";
import { Post } from "@/lib/interfaces";

interface Comment {
  _id: string;
  id_post: string;
  name: string;
  createdAt: string;
  comment: string;
}

interface CommentarioProps {
  post: Post;
  click: boolean;
}

const Commentario = ({ post, click }: CommentarioProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const postId = post ? post._id : "";

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get<Comment[]>(
        "http://localhost:3001/api/comments"
      );
      const data = res.data;

      // Formatear la fecha de creación en formato 'es-ES'
      data.forEach((coment: Comment) => {
        coment.createdAt = new Date(post.createdAt).toLocaleDateString("es-ES");
      });

      setComments(data);
    };

    if (postId) {
      fetchComments();
    }
  }, [click, postId]);

  const filteredComments = postId
    ? comments.filter((comm) => comm.id_post === postId)
    : [];

  return (
    <>
      {filteredComments.map((postComm) => (
        <div key={postComm._id} className="comment">
          <div className="topComment">
            <span className="nick">{postComm.name}</span>
            <span className="date">{postComm.createdAt}</span>
          </div>
          <div className="commentario">{postComm.comment}</div>
        </div>
      ))}
    </>
  );
};

export default Commentario;
