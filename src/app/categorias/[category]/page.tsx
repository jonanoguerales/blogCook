import { GetPostsCategoria } from "@/components/GetPostsCategoria";

export default async function CategoryPosts({
  params: { category },
}: {
  params: { category: string };
}) {
  return (
    <section className="mx-auto max-w-screen-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold pb-10">{category}</h2>
      <GetPostsCategoria category={category} />
    </section>
  );
}
