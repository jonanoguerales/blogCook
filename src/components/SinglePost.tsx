"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import "@/app/posts/[id]/post.css";
import { useRouter } from "next/navigation";
import { Post, SinglePostProps } from "@/lib/interfaces";
import { useAuth } from "@/context/authContext";
import {
    StarIcon,
    CheckBadgeIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

const SinglePost: React.FC<SinglePostProps> = ({ id }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const getPost = async () => {
            if (typeof id === "string") {
                try {
                    const res = await axios.get(`http://localhost:3001/api/posts/${id}`);
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

    const handleDelete = async () => {
        if (post) {
            try {
                await axios.delete(`http://localhost:3001/api/posts/${id}`, {
                    data: { username: user?.username },
                });
                router.push("/");
            } catch (error) {
                console.error(error);
            }
        }
    };

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
                `http://localhost:3001/api/posts/${id}`,
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
                    src={
                        file ?
                            previewUrl :
                            (post ? post.photo : "")
                    }
                    alt="imagen del articulo"
                    width={1980}
                    height={1080}
                />
                <label htmlFor="fileInput" className="CambiarImgPostCont">
                    {updateMode && (
                        <ClipboardDocumentListIcon className="size-6 text-slate-600 hover:text-slate-300 CambiarImgPost" />
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
                    <h1 className="singlePostTitle">
                        {title}
                        {post?.username === user?.username && (
                            <div className="singlePostEdit">
                                <i

                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}
                                >actualizar</i>

                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                    onClick={handleDelete}
                                >borrar</i>
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