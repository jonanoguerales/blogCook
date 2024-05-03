import Image from "next/image";
import { CardPostProps } from "@/lib/interfaces";
import Link from "next/link";

export function CardPost(props: CardPostProps) {
  return (
    <article className="max-w-[1000px] overflow-hidden rounded-lg shadow transition hover:shadow-lg flex flex-col xss:flex-row xss:h-[250px]">
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
          <div className="flex justify-between">
            <time dateTime="2022-10-10" className="block text-xs text-gray-500">
              {props.fecha}
            </time>
            <span className="block text-xs text-gray-500">{props.autor}</span>
          </div>

          <a href="#">
            <h3 className="mt-0.5 text-lg text-gray-900">{props.titulo}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 h-[inherit]">
            {props.parrafo}
          </p>
          <Link href={`/posts/${props.id}`}>
            <button className="mt-4 rounded-md hover:bg-slate-400 border border-blue-800 bg-blue-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-800 focus:ring shadow-lg">
              ver receta
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
