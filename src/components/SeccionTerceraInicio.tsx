import { PostsTotales } from "@/app/posts/page";
import { Paginacion } from "./Paginacion";
import { SiderBar } from "./SideBar";

export default function SeccionTerceraInicio() {
  return (
    <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="  bg-white lg:col-span-2 flex flex-col gap-8">
          <h2 className="text-2xl font-bold">Artículos mas recientes</h2>
          <PostsTotales />
          <Paginacion />
        </div>
        <div className="flex flex-col gap-8 bg-white">
          <SiderBar />
        </div>
      </div>
    </section>
  );
}
