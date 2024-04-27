import { CardCategoria } from "./CardCategoria";

export async function SeccionSecundariaInicio() {
  return (
    <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center pb-8">
        CATEGORIAS POPULARES
      </h2>
      <article className="flex flex-wrap gap-7 justify-center">
        <CardCategoria
          img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144147/carnes_-_Profile_Picture_thmfnj.png"
          categoria={"Carne"}
          bg="bg-red-500"
        />
        <CardCategoria
          img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144423/pescado.png"
          categoria={"Pescado"}
          bg="bg-sky-500"
        />
        <CardCategoria
          img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144154/pastas_-_Profile_Picture_xyzaum.png"
          categoria={"Pasta"}
          bg="bg-yellow-300"
        />
        <CardCategoria
          img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144160/verduras_-_Profile_Picture_xkgxqk.png"
          categoria={"Verduras"}
          bg="bg-green-600"
        />
        <CardCategoria
          img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144150/ensaladas_-_Profile_Picture_ult3rg.png"
          categoria={"Ensaladas"}
          bg="bg-lime-400"
        />
        <CardCategoria
          img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144157/postres_-_Profile_Picture_tfmmoz.png"
          categoria={"Postres"}
          bg="bg-orange-300"
        />
      </article>
    </section>
  );
}
