import { UserRole } from "@/lib/interfaces";
import axios from "axios";


export async function UpdateUser(props: UserRole, type: "post" | "comment" | "like") {
    const res = await axios.get(`http://localhost:3001/api/user/${props.id}`);
    const data = await res.data;
    const users = data;
    let updateUser;
    switch (type) {
        case "post":
            updateUser = {
                numComentarios: users.numComentarios,
                numLikes: users.numLikes,
                numPosts: users.numPosts + 1,
            };
            break;
        case "comment":
            updateUser = {
                numComentarios: users.numComentarios + 1,
                numLikes: users.numLikes,
                numPosts: users.numPosts,
            };
            break;
        case "like":
            updateUser = {
                numComentarios: users.numComentarios,
                numLikes: users.numLikes + 1,
                numPosts: users.numPosts,
            };
            break;
        default:
            throw new Error("Invalid type");
    }
    await axios.put(`http://localhost:3001/api/user/${props.id}`, updateUser);
}