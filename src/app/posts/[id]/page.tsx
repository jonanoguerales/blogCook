export default function Post({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Estamos en la página de post {id}
      </h1>
    </div>
  )
}
