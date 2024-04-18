"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./redactar.css";

export default function Redactar() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  //const { user } = useContext(Context);

  useEffect(() => {
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      // Revoke the object URL to avoid memory leaks
      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [file]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newPost = {
      username: "jona",
      title,
      desc,
      categories,
      id_user: "65d7146ccc2dca2496cb4728",
      photo: "",
    };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const datajson = await response.json();
      newPost.photo = datajson.url;
    }
    try {
      const res = await axios.post("http://localhost:3001/api/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write mx-auto max-w-screen-3xl">
      {file && (
        <Image
          className="writeImg"
          src={previewUrl}
          alt=""
          width={1280}
          height={720}
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput" className="inputImagePlus">
            <i className="writeIcon fas fa-plus" />
            Imagen
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0] instanceof File) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <input
            className="writeInput"
            placeholder="Titulo"
            type="text"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Cuenta tu historia..."
            typeof="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="categoriasSelect">
          <select
            className="selectEdit"
            name="categorias"
            id="categorias"
            autoFocus
            defaultValue="Carne"
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="Carne">Carne</option>
            <option value="Terror">Terror</option>
            <option value="Música">Musica</option>
            <option value="Interesantes">Interesantes</option>
            <option value="Viajes">Viajes</option>
            <option value="Misteriosos">Misteriosos</option>
            <option value="Anime">Anime</option>
            <option value="Videojuegos">Videojuegos</option>
            <option value="Comedia">Comedia</option>
            <option value="Romance">Romance</option>
            <option value="Bélica">Bélica</option>
          </select>
        </div>
        <button className="writeSubmit" type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
}
