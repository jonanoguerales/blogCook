import Image from "next/image";

export function SeccionPrimeraInicio() {
  return (
    <section>
      <div className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-max lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <Image
                alt="Imagen de la receta"
                src="/1.jpg"
                className="absolute inset-0 h-full w-full object-cover lg:rounded-lg rounded-t-lg shadow-xl"
                width={1080}
                height={720}
              />
            </div>
          </div>

          <div className="relative flex items-center bg-sky-100 lg:rounded-r-lg max-lg:rounded-b-lg">
            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 bg-sky-100"></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Receta de Panceta en freidora de aire
              </h2>

              <p className="mt-4 text-gray-600">
                La panceta es un corte de carne de cerdo muy consumido que
                gustará a todos. Intercalado con carne, piel de cerdo y grasa,
                resulta perfecto a la parrilla, frito o asado y, en esta
                ocasión, aprenderemos a preparar una deliciosa panceta en la
                airfryer muy bien condimentada, preparada con azúcar moreno,
                mostaza y otros condimentos. Cortado en cubos o rectángulos,
                puede presentarse incluso como aperitivo.
              </p>

              <a
                href="#"
                className="mt-8 inline-block rounded border border-blue-800 bg-blue-800 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-800 focus:outline-none focus:ring active:text-blue-800 shadow-lg"
              >
                Leer receta
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
