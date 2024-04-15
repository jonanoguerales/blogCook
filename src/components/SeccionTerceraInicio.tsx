import { CardPost } from "./CardPost";

export function SeccionTerceraInicio() {
    return (
        <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div className=" rounded-lg bg-white lg:col-span-2 flex flex-col gap-8">
                    <h2 className="text-2xl font-bold">Artículos mas recientes</h2>
                    <CardPost />
                    <CardPost />
                    <CardPost />
                    <CardPost />
                </div>
                <div className=" rounded-lg bg-gray-200">
                    <article>
                        <h2 className="text-2xl font-bold">Artículos Populares</h2>


                    </article>
                    <article>
                        <h2 className="text-2xl font-bold">Usuarios Populares</h2>

                    </article>
                </div>
            </div>
        </section>
    )
}