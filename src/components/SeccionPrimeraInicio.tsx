"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";
import { Posts } from "@/lib/interfaces";

export function SeccionPrimeraInicio() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        function nextTimeout() {
          if (slider) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              if (slider) {
                slider.next();
              }
            }, 3000);
          }
        }
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:3001/api/posts");
      setPosts(res.data);
    };
    fetchPost();
  }, []);

  if (posts.length === 0) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se espera a que los datos se carguen
  }

  return (
    <div ref={sliderRef} className="keen-slider">
      {posts.map((item) => (
        <div key={item._id} className="keen-slider__slide">
          <section>
            <div className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:h-max lg:grid-cols-2">
                <div className="relative z-10 lg:py-16">
                  <div className="relative h-64 sm:h-80 lg:h-full">
                    <Image
                      alt="Imagen de la receta"
                      src={item.photo}
                      className="absolute inset-0 h-full w-full object-fill lg:rounded-lg rounded-t-lg shadow-xl"
                      width={1920}
                      height={1080}
                    />
                  </div>
                </div>
                <div className="relative flex items-center bg-sky-100 lg:rounded-r-lg max-lg:rounded-b-lg">
                  <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 bg-sky-100"></span>
                  <div className="p-8 sm:p-16 lg:p-24">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-4 line-clamp-6 text-gray-600">
                      {item.desc}
                    </p>
                    <Link
                      href={`/posts/${item._id}`}
                      className="mt-8 inline-block rounded border border-blue-800 bg-blue-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-800 focus:outline-none focus:ring active:text-blue-800 shadow-lg"
                    >
                      Leer receta
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
