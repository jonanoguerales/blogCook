import { CardPopulares } from "./CardPopulares";
import { CardUsuariosPopular } from "./CardUsuariosPopular";

export function SiderBar() {
  return (
    <>
      <article className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Artículos Populares</h2>
        <CardPopulares
          bg="bg-red-500"
          categoria="Carne"
          titulo="Receta de Panceta en freidora de aire"
          parrafo="La panceta es un corte de carne de cerdo muy consumido que gustará a todos."
          autor="Jona"
          fecha="12/12/2022"
        />
        <CardPopulares
          bg="bg-red-500"
          categoria="Carne"
          titulo="Receta de Panceta en freidora de aire"
          parrafo="La panceta es un corte de carne de cerdo muy consumido que gustará a todos."
          autor="Jona"
          fecha="12/12/2022"
        />
        <CardPopulares
          bg="bg-red-500"
          categoria="Carne"
          titulo="Receta de Panceta en freidora de aire"
          parrafo="La panceta es un corte de carne de cerdo muy consumido que gustará a todos."
          autor="Jona"
          fecha="12/12/2022"
        />
      </article>
      <article className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Usuarios Populares</h2>
        <CardUsuariosPopular
          img="/1.jpg"
          usuario="Jona"
          comentarios={0}
          posts={0}
          likes={0}
        />
        <CardUsuariosPopular
          img="/1.jpg"
          usuario="Jona"
          comentarios={0}
          posts={0}
          likes={0}
        />
        <CardUsuariosPopular
          img="/1.jpg"
          usuario="Jona"
          comentarios={0}
          posts={0}
          likes={0}
        />
      </article>
    </>
  );
}
