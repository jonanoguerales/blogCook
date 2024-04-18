import Image from "next/image";
import {
  StarIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { CardUsuariosPopularProps } from "@/lib/interfaces";

export function CardUsuariosPopular(props: CardUsuariosPopularProps) {
  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white shadow-lg">
      <div className="flex gap-8 px-4 pt-6">
        <div>
          <Image
            alt="Imagen pefil de usuario"
            src={props.img}
            className="size-32 rounded-lg object-cover"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h3 className="font-medium sm:text-lg">{props.usuario}</h3>
          <div className="flex items-center gap-1 text-gray-500 pt-2">
            <ClipboardDocumentListIcon className="size-6 text-blue-300" />

            <p className="text-xs">{props.posts} articulos</p>
          </div>

          <div className="flex items-center gap-1 text-gray-500 pt-2">
            <ChatBubbleLeftRightIcon className="size-6 text-blue-300" />

            <p className="text-xs">{props.comentarios} comentarios</p>
          </div>
          <div className="flex items-center gap-1 text-gray-500 pt-2">
            <StarIcon className="size-6 text-blue-300" />

            <p className="text-xs">{props.posts} likes</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
          <CheckBadgeIcon className="h-6 w-6 text-green-700" />

          <span className="text-[10px] font-medium sm:text-xs">
            Verificado!
          </span>
        </strong>
      </div>
    </article>
  );
}
