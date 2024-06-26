import Image from "next/image";
import {
  StarIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { CardUsuariosPopularProps } from "@/lib/interfaces";
import Link from "next/link";

export function CardUsuariosPopular(props: CardUsuariosPopularProps) {
  return (
    <article className="rounded-xl bg-white shadow-lg w-[360px]">
      <Link href={`/perfil/${props.id}`}>
        <div className="flex gap-8 h-[140px]">
          <div className="pl-4 py-2">
            <Image
              alt="Imagen pefil de usuario"
              src={props.img}
              className="h-full rounded-lg object-cover"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full relative">
            <div className="flex flex-col pt-2">
              <h3 className="font-medium sm:text-lg">{props.usuario}</h3>
              <div className="flex items-center gap-1 text-gray-500 pt-2">
                <ClipboardDocumentListIcon className="size-6 text-blue-800" />

                <p className="text-xs">{props.posts} articulos</p>
              </div>

              <div className="flex items-center gap-1 text-gray-500 pt-2">
                <ChatBubbleLeftRightIcon className="size-6 text-blue-300" />

                <p className="text-xs">{props.comentarios} comentarios</p>
              </div>
              <div className="flex">
                <div className="flex items-center gap-1 text-gray-500 pt-2">
                  <StarIcon className="size-6 text-amber-300" />

                  <p className="text-xs">{props.likes} likes</p>
                </div>
                <div className="absolute bottom-0 right-0">
                  <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
                    <CheckBadgeIcon className="h-6 w-6 text-green-700" />

                    <span className="text-[10px] font-medium sm:text-xs">
                      Verificado!
                    </span>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
