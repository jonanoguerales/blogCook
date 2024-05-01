export interface User {
  _id: string;
  username: string;
  nombre: string;
  email: string;
  password: string;
  passwordSec: string;
  telefono: string;
  profilePic: string;
  role: string;
  numPosts: number;
  numComentarios: number;
  numLikes: number;
  createdAt: string;
}

export interface State {
  user: User | null;
  isFetching: boolean;
  error: boolean;
  dispatch: React.Dispatch<Action>;
}

export interface Action {
  type: string;
  payload?: User;
}

export interface AuthContextProps {
  user: User | null;
  isLogged: () => boolean;
  hasRole: (role: string) => boolean;
}

export interface CardCategoriaProps {
  img: string;
  categoria: string;
  bg: string;
}

export interface CardPopularesProps {
  id: string;
  categoria: string;
  title: string;
  parrafo: string;
  bg: string;
  fecha: string;
  autor: string;
  likes: number;
}

export interface CardPostProps {
  id: string;
  img: string;
  categoria: string;
  titulo: string;
  parrafo: string;
  bg: string;
  fecha: string;
  autor: string;
}

export interface CardUsuariosPopularProps {
  id: string;
  img: string;
  comentarios: number;
  posts: number;
  likes: number;
  usuario: string;
}

export interface Posts {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  username: string;
  id_user: string;
  categories: string;
  createdAt: string;
  updatedAt: string;
  bg: string;
  numLikes: number;
  shortDescription: string;
}

export interface PrivateRouteProps {
  hasRole: string;
  children: React.ReactNode;
}

export interface Post {
  _id: string;
  title: string;
  desc: string;
  photo: string;
  username: string;
  createdAt: string;
}

export interface SinglePostProps {
  id: string;
}

export type UserRole = {
  id: string;
  role: string;
  username: string;
};
