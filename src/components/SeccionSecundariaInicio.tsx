import { CardCategoria } from "./CardCategoria";

export function SeccionSecundariaInicio() {
    return (
        <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center pb-8">CATEGORIAS POPULARES</h2>
            <article className="flex gap-7 justify-center">
                <CardCategoria img="/1.jpg" categoria={"Carne"} bg="bg-red-500" />
                <CardCategoria img="/1.jpg" categoria={"Pescado"} bg="bg-sky-500" />
                <CardCategoria img="/1.jpg" categoria={"Pasta"} bg="bg-yellow-300" />
                <CardCategoria img="/1.jpg" categoria={"Verduras"} bg="bg-green-600" />
                <CardCategoria img="/1.jpg" categoria={"Ensaladas"} bg="bg-lime-400" />
                <CardCategoria img="/1.jpg" categoria={"Sopas y Cremas"} bg="bg-orange-300" />
            </article>
        </section>
    )
}