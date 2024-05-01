import Link from "next/link";
import { CardCategoria } from "./CardCategoria";

export async function SeccionSecundariaInicio() {
  return (
    <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center pb-8">
        CATEGORIAS POPULARES
      </h2>
      <article className="flex flex-wrap gap-7 justify-center">
        <Link href="/categorias/Carnes">
          <CardCategoria
            img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144147/carnes.png"
            categoria={"Carnes"}
            bg="bg-red-500"
          />
        </Link>
        <Link href="/categorias/Pescados">
          <CardCategoria
            img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144423/pescado.png"
            categoria={"Pescados"}
            bg="bg-blue-200"
          />
        </Link>
        <Link href="/categorias/Pastas">
          <CardCategoria
            img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144154/pastas.png"
            categoria={"Pastas"}
            bg="bg-yellow-300"
          />
        </Link>
        <Link href="/categorias/Verduras">
          <CardCategoria
            img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144160/verduras.png"
            categoria={"Verduras"}
            bg="bg-green-600"
          />
        </Link>
        <Link href="/categorias/Ensaladas">
          <CardCategoria
            img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144150/ensaladas.png"
            categoria={"Ensaladas"}
            bg="bg-lime-400"
          />
        </Link>
        <Link href="/categorias/Postres">
          <CardCategoria
            img="https://res.cloudinary.com/dpauhj4zu/image/upload/v1714144157/postres.png"
            categoria={"Postres"}
            bg="bg-orange-300"
          />
        </Link>
      </article>
    </section>
  );
}
