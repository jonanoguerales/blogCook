import Image from "next/image";

export default function Post({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <Image
          className="writeImg"
          src="/images/user.png"
          alt=""
        />
        <label htmlFor="fileInput" className="CambiarImgPostCont">
          {updateMode && (
            <FontAwesomeIcon icon={faUserCircle} className="CambiarImgPost" />
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          className="singlePostImg"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                />
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/perfil/${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  )
}
