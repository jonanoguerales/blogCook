import SinglePost from "@/components/singlePost/SinglePost";

function Post({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <SinglePost id={id as string} />
    </div>
  );
}

export default Post;
