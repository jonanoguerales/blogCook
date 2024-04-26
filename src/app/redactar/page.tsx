"use client";
import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { UpdateUser } from "@/components/UpdateUser";
import "./redactar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const getCategoryColors = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/categories");
    const categoryColors = response.data.reduce(
      (
        colors: Record<string, string>,
        category: { name: string; color: string }
      ) => {
        colors[category.name] = category.color;
        return colors;
      },
      {}
    );
    return categoryColors;
  } catch (error) {
    console.error(
      "Error al obtener los colores de la tabla de categorías:",
      error
    );
    return {};
  }
};

export default function Redactar() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("Carne");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>(
    {}
  );
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const fetchCategoryColors = async () => {
      const colors = await getCategoryColors();
      setCategoryColors(colors);
    };

    fetchCategoryColors();
  }, []);

  useEffect(() => {
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      return () => URL.revokeObjectURL(newPreviewUrl);
    }
  }, [file]);

  if (!user) {
    console.error("No hay información de usuario disponible.");
    return console.log("No hay información de usuario disponible.");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("No hay información de usuario disponible.");
      return;
    }

    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
      id_user: user.id,
      photo: "",
      bg: selectedColor,
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
        newPost.photo = datajson.url;
      } catch (err) {
        console.error(err);
        return;
      }
    }

    try {
      const res = await axios.post("http://localhost:3001/api/posts", newPost);
      router.replace(`/posts/${res.data._id}`);
      await UpdateUser(user, "post");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="write mx-auto max-w-screen-3xl">
      {file && (
        <Image
          className="writeImg"
          src={previewUrl}
          alt="Imagen previa de la receta"
          width={1280}
          height={720}
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput" className="inputImagePlus">
            <FontAwesomeIcon icon={faImage} className="writeIcon" />
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
            onChange={(e) => {
              setCategories(e.target.value);
              setSelectedColor(categoryColors[e.target.value]);
            }}
          >
            <option value="Carne">Carne</option>
            <option value="Pescado">Pescado</option>
            <option value="Pasta">Pasta</option>
            <option value="Verduras">Verduras</option>
            <option value="Ensaladas">Ensaladas</option>
            <option value="Postres">Postres</option>
          </select>
          <button className="writeSubmit" type="submit">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}
