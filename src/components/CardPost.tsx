import Image from "next/image";

interface CardPostProps {
  img: string;
  categoria: string;
  titulo: string;
  parrafo: string;
  bg: string;
  fecha: string;
  autor: string;
}

export function CardPost(params: CardPostProps) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg flex">
      <div className="w-1/2">
        <Image
          alt=""
          src={params.img}
          className="w-auto h-auto object-cover transition duration-500 hover:scale-105"
          width={640}
          height={426}
        />
      </div>

      <div className="bg-white p-4 sm:p-6 w-1/2 z-10">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          {params.fecha}
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">{params.titulo}</h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {params.parrafo}
        </p>
      </div>
    </article>
  );
}
