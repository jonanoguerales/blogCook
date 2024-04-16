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
      <Image
        alt=""
        src={params.img}
        className="w-full h-56 object-cover"
        width={1920}
        height={1080}
      />

      <div className="bg-white p-4 sm:p-6">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          {" "}
          {params.fecha}{" "}
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">
            {params.titulo}
          </h3>
        </a>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {params.parrafo}
        </p>
      </div>
    </article>
  );
}
