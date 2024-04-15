import Image from "next/image";
import React from "react";

interface CardCategoriaProps {
  img: string;
  categoria: string;
  bg: string;
}

export function CardCategoria(props: CardCategoriaProps) {
  return (
    <article
      className={`flex items-center justify-center gap-4 rounded-lg border border-gray-100 ${props.bg} shadow-lg py-2 px-4 min-w-[200px] mx-auto text-center`}
    >
      <Image
        src={props.img}
        alt="Imagen de la card"
        width={300}
        height={300}
        className="w-16 h-16 object-cover rounded-full"
      />

      <div>
        <p className="text-xl font-medium text-gray-900">{props.categoria}</p>
      </div>
    </article>
  );
}
