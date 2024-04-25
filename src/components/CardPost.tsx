import Image from "next/image";
import { CardPostProps } from "@/lib/interfaces";
import Link from "next/link";

export function CardPost(props: CardPostProps) {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg flex max-xss:flex-col xss:h-[250px]">
      <div className="xss:w-1/2">
        <Image
          alt="imagen receta"
          src={props.img}
          className="w-full h-full object-fill transition duration-500 hover:scale-105"
          width={640}
          height={426}
        />
      </div>
      <div className="bg-white p-4 sm:p-6 xss:w-1/2 z-10 h-full">
        <div className="w-full h-full flex flex-col">
          <time dateTime="2022-10-10" className="block text-xs text-gray-500">
            {props.fecha}
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900">{props.titulo}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 h-[inherit]">
            {props.parrafo}
          </p>
          <Link href={`/posts/${props.id}`}>
            <button className="mt-4 text-sm/relaxed text-white bg-slate-600 px-14 py-2 rounded-md hover:bg-slate-400 hover:text-black">
              ver receta
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
