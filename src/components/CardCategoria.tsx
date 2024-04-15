import React from 'react';

interface CardCategoriaProps {
    img: string;
    categoria: string;
    bg: string;
}

export function CardCategoria(props: CardCategoriaProps) {
    return (
        <article className={`flex items-center justify-center gap-4 rounded-lg border border-gray-100 ${props.bg} shadow-lg py-2 px-4 min-w-[200px] mx-auto text-center`}>
            <img src={props.img} alt="Imagen de la card" width={45} height={32} className="rounded-full" />

            <div>
                <p className="text-xl font-medium text-gray-900">{props.categoria}</p>
            </div>
        </article>
    );
}