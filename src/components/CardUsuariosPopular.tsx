import Image from "next/image";

interface CardUsuariosPopularProps {
  img: string;
  comentarios: number;
  posts: number;
  likes: number;
  usuario: string;
}

export function CardUsuariosPopular(props: CardUsuariosPopularProps) {
  return (
    <article className="rounded-xl border-2 border-gray-100 bg-white shadow-lg">
      <div className="flex gap-8 px-4 pt-4 items-center">
        <div>
          <Image
            alt="Imagen pefil de usuario"
            src={props.img}
            className="size-24 rounded-lg object-cover"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h3 className="font-medium sm:text-lg">{props.usuario}</h3>
          <div className="flex items-center gap-1 text-gray-500 pt-2">
            <svg
              className="size-5"
              fill="#6b7280"
              version="1.1"
              id="XMLID_65_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g id="article">
                <g>
                  <path
                    d="M20.5,22H4c-0.2,0-0.3,0-0.5,0C1.6,22,0,20.4,0,18.5V6h5V2h19v16.5C24,20.4,22.4,22,20.5,22z M6.7,20h13.8
			                            c0.8,0,1.5-0.7,1.5-1.5V4H7v14.5C7,19,6.9,19.5,6.7,20z M2,8v10.5C2,19.3,2.7,20,3.5,20S5,19.3,5,18.5V8H2z"
                  />
                </g>
                <g>
                  <rect x="15" y="6" width="5" height="6" />
                </g>
                <g>
                  <rect x="9" y="6" width="4" height="2" />
                </g>
                <g>
                  <rect x="9" y="10" width="4" height="2" />
                </g>
                <g>
                  <rect x="9" y="14" width="11" height="2" />
                </g>
              </g>
            </svg>

            <p className="text-xs">{props.posts} articulos</p>
          </div>

          <div className="flex items-center gap-1 text-gray-500 pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>

            <p className="text-xs">{props.comentarios} comentarios</p>
          </div>
          <div className="flex items-center gap-1 text-gray-500 pt-2">
            <svg
              className="w-5 h-4"
              width="133px"
              height="133px"
              viewBox="0 0 1024.00 1024.00"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#6b7280"
              stroke="#6b7280"
              stroke-width="80.896"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z"
                  fill="#ffffff"
                />
              </g>
            </svg>

            <p className="text-xs">{props.posts} likes</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>

          <span className="text-[10px] font-medium sm:text-xs">
            Verificado!
          </span>
        </strong>
      </div>
    </article>
  );
}
