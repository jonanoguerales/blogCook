import Image from "next/image";
import { CardPostProps } from "@/lib/interfaces";
import Link from "next/link";

export function CardPost(props: CardPostProps) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg flex">
      <Link href={`/posts/${props.id}`}>
        <div className="w-1/2">
          <Image
            alt="imagen receta"
            src={props.img}
            className="w-auto h-auto object-cover transition duration-500 hover:scale-105"
            width={640}
            height={426}
          />
        </div>
        <div className="bg-white p-4 sm:p-6 w-1/2 z-10">
          <time dateTime="2022-10-10" className="block text-xs text-gray-500">
            {props.fecha}
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900">{props.titulo}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {props.parrafo}
          </p>
        </div>
      </Link>
    </article>
  );
}
