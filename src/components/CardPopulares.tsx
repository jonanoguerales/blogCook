import { CardPopularesProps } from "@/lib/interfaces";
export function CardPopulares(props: CardPopularesProps) {
  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div>
        <strong
          className={`rounded border ${props.bg} px-3 py-1.5 text-[14px] font-medium text-white`}
        >
          {props.categoria}
        </strong>

        <h3 className="mt-4 text-lg font-medium sm:text-xl">{props.titulo}</h3>

        <p className="mt-1 text-sm text-gray-700">{props.parrafo}</p>

        <div className="mt-4 sm:flex sm:items-center sm:gap-2">
          <p className="text-xs font-medium text-gray-500">{props.fecha}</p>

          <span className="hidden sm:block" aria-hidden="true">
            &middot;
          </span>

          <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
            {props.autor}
          </p>
        </div>
      </div>
    </article>
  );
}
