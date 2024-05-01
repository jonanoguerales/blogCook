import Link from "next/link";
import UserPosts from "@/components/ObtenerPostsUser";
import "./perfil.css";
import Image from "next/image";
import { getUser } from "@/lib/api";

async function SingleUser({ params: { id } }: { params: { id: string } }) {
  const user = await getUser(id);

  return (
    <>
      <div className="single">
        <div className="left">
          <div className="editButton">
            <Link href="/ajustes" style={{ textDecoration: "none" }}>
              Edit
            </Link>
          </div>
          <h1 className="title">Información del Perfil</h1>
          <div key={user._id} className="item">
            <Image
              src={user.profilePic}
              alt="foto perfil"
              className="itemImg"
              width={320}
              height={320}
            />
            <div className="details">
              <h1 className="itemTitle">{user.nombre}</h1>
              <div className="detailItem">
                <span className="itemKey">Usuario:</span>
                <span className="itemValue">{user.username}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{user.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Telefono:</span>
                <span className="itemValue">{user.telefono}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Posts:</span>
                <span className="itemValue">{user.numPosts}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Fecha creacion:</span>
                <span className="itemValue">{user.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="lastPostTittle">Ultimos Posts</h1>
          <div className="postsUser">
            <UserPosts id={id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleUser;
