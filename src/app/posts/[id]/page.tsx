"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import "./post.css";

interface Post {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  username: string;
  createdAt: string;
}

const SinglePost: React.FC = () => {
  //const router = useRouter();
  const id = "661fcd85bdd97ca78556618b";
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  // const { user } = useContext(UserContext); // Descomentar y usar tu contexto real

  useEffect(() => {
    const getPost = async () => {
      if (typeof id === "string") {
        try {
          const res = await axios.get(`http://localhost:3001/api/posts/${id}`);
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    if (post) {
      try {
        await axios.delete(`http://localhost:3001/api/posts/${post._id}`, {
          data: { username: "jona" }, // Reemplazar con el nombre de usuario real si es necesario
        });
        //router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async () => {
    if (post && file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);

      try {
        await axios.post("http://localhost:3001/api/upload", data);
        const updatePost = {
          username: "jona", // Reemplazar con el nombre de usuario real si es necesario
          title,
          desc,
          photo: filename,
        };
        await axios.put(
          `http://localhost:3001/api/posts/${post._id}`,
          updatePost
        );
        setUpdateMode(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Componente JSX
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <Image
          className="writeImg"
          src={post ? post.photo : ""}
          alt="imagen del articulo"
          width={1980}
          height={1080}
        />
        <label htmlFor="fileInput" className="CambiarImgPostCont">
          {/* {updateMode && (
              //<FontAwesomeIcon icon={faUserCircle} className="CambiarImgPost" />
            )}*/}
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
          <h1 className="singlePostTitle">
            {title}
            {post?.username === "jona" && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                />
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
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
    </div>
  );
};

export default SinglePost;
