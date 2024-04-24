"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

interface PostsData {
  categories: string;
}

const BarChart: React.FC = () => {
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [dataCat, setDataCat] = useState<{ name: string; cats: number }[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://apiblog-01g5.onrender.com/api/posts"
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const postCat = posts.map((post) => post.categories);

    const categories = [
      "Terror",
      "Música",
      "Viajes",
      "Comedia",
      "Interesantes",
      "Misteriosos",
      "Videojuegos",
      "Romance",
      "Anime",
      "Bélica",
    ];

    const data = categories.map((category) => ({
      name: category,
      cats: postCat.filter((cat) => cat === category).length,
    }));

    setDataCat(data);
  }, [posts]);

  const chartData = {
    labels: dataCat.map((data) => data.name),
    datasets: [
      {
        label: "CATEGORIAS",
        data: dataCat.map((data) => data.cats),
        backgroundColor: [
          "black",
          "tomato",
          "cyan",
          "#7451f8",
          "#f8bb51",
          "#c61d94",
          "#c6bb1d",
          "#4fffc0",
          "#82a711b5",
          "#ee647e",
        ],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
