"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import "./post.css";
import { useRouter } from "next/navigation";
import { Post, SinglePostProps } from "@/lib/interfaces";
import { useAuth } from "@/context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Comments from "../comments/Comments";
import { DialogDefault } from "../modales/ModalAdvert.jsx";

const SinglePost: React.FC<SinglePostProps> = ({ id }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getPost = async () => {
      if (typeof id === "string") {
        try {
          const res = await axios.get(
            `https://apiblog-01g5.onrender.com/api/post/${id}`
          );
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [file]);

  const handleUpdate = async () => {
    const updatePost = {
      username: user?.username,
      title,
      desc,
      photo: post?.photo,
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        const datajson = await response.json();
        updatePost.photo = datajson.url;
      } catch (err) {
        console.error(err);
        return;
      }
    }

    try {
      await axios.put(
        `https://apiblog-01g5.onrender.com/api/posts/${id}`,
        updatePost
      );
      setUpdateMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <Image
          className="writeImg"
          src={file ? previewUrl : post ? post.photo : ""}
          alt="imagen del articulo"
          width={1980}
          height={1080}
        />
        <label htmlFor="fileInput" className="CambiarImgPostCont">
          {updateMode && (
            <FontAwesomeIcon
              icon={faImage}
              className="size-6 text-slate-600 hover:text-slate-300 CambiarImgPost"
            />
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          className="singlePostImg"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className="singlePostTop">
            <div className="w-full">
              <h1 className="singlePostTitle"> {title}</h1>
            </div>
            {post?.username === user?.username && (
              <div className="singlePostEdit">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                />
                <DialogDefault id={id} />
              </div>
            )}
          </div>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Autor:
            <Link href={`/perfil/${post?.username}`} className="link">
              <b> {post?.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {post ? new Date(post.createdAt).toDateString() : "Loading..."}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <Comments post={post as Post} />
    </div>
  );
};

export default SinglePost;
