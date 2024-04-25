"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Posts } from '@/lib/interfaces';
import { CardPost } from './CardPost';

interface UserPostsProps {
    id: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ id }) => {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/posts");
                const postsFilteredById = res.data.filter((post: Posts) => post.id_user === id);
                setPosts(postsFilteredById);
            } catch (error) {
                console.error('Error al conseguir los posts:', error);
            }
        };

        fetchPosts();
    }, [id]);

    return (
        <>
            {posts.map((post: Posts) => (
                <CardPost
                    key={post._id}
                    id={post._id}
                    titulo={post.title}
                    parrafo={post.desc}
                    img={post.photo}
                    categoria={post.categories}
                    autor={post.username}
                    fecha={post.createdAt}
                    bg={post.bg}
                />
            ))}
        </>
    );
};

export default UserPosts;