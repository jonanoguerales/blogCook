import { GetPostsCategoria } from "@/components/GetPostsCategoria";

export default async function CategoryPosts({ params: { category } }: { params: { category: string } }) {

  return (
    <GetPostsCategoria category={category} />
  );
};

