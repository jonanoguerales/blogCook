import { CardPost } from "./CardPost";
import { Paginacion } from "./Paginacion";
import { SiderBar } from "./SideBar";

interface Posts {
  _id: number;
  title: string;
  desc: string;
}

export default async function SeccionTerceraInicio() {
  const posts = await fetch("https://apiblog-01g5.onrender.com/api/posts");
  const data = await posts.json();
  console.log(data);
  return (
    <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="  bg-white lg:col-span-2 flex flex-col gap-8">
          <h2 className="text-2xl font-bold">Artículos mas recientes</h2>
          {data.map((post: Posts) => (
            <CardPost
              key={post._id}
              titulo={post.title}
              parrafo={post.desc}
              img="/1.jpg"
              categoria="Carne"
              autor="jona"
              fecha="12/12/2022"
              bg="bg-red-500"
            />
          ))}
          <Paginacion />
        </div>
        <div className="flex flex-col gap-8 bg-white">
          <SiderBar />
        </div>
      </div>
    </section>
  );
}
