"use client"

import { LikeEntity } from "@/entities/LikeEntity";
import { PostEntity } from "@/entities/PostEntity";
import useAuthContext from "@/hooks/useAuthContext";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import React from "react";

interface PostContextProps {
    posts: PostEntity[];
    createPost: ({ location, caption, tags, image }: PostEntity) => Promise<PostEntity | void>;
    getPostById: (postId: string) => Promise<PostEntity | void>;
    getPosts: () => Promise<void>;
    likePost: (authorId: string, postId: string) => Promise<LikeEntity | undefined>;
}

export const PostContext = React.createContext(
    {} as PostContextProps
)

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = React.useState<PostEntity[]>([]);
    const [likes, setLikes] = React.useState<LikeEntity[]>([])
    const { user } = useAuthContext();
    const router = useRouter();

    const createPost = async ({ location, caption, tags, image }: PostEntity) => {
        const postData = new FormData();

        postData.append("caption", caption);
        postData.append("location", location);
        postData.append("tags", tags);
        postData.append("image", image!);
        postData.append("authorId", user?.id!);
    
        const newPost = await api
          .post<PostEntity>("/new/post", 
            postData,
          )
          .then((res) => res.data);
    
        if (!newPost) {
          throw Error("Something went wrong while creating post.");
        }
    
        router.push("/home");
        return newPost;
    }

    const getPosts = async () => {
        const getAllPosts = await api.get<PostEntity[]>("/all/posts").then(res => res.data);

        setPosts(getAllPosts)
    }

    const getPostById = async (postId: string) => {
        const post = await api.get<PostEntity>("/get/post", {
            data: {
                id: postId
            }
        })

        if(!post) {
            return;
        }
    }
    // *TODO: Create post actions methods
    // "/new/commentary", "/edit/commentary/:id", "/delete/commentary/:id", and so on...

    const likePost = async (authorId: string, postId: string) => {
        const response = await api.post<LikeEntity>("/new/like", {
            postId,
            authorId
        }).then(res => res.data);

        if(!response) {
            return;
        }

        return response;
    }

    React.useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <PostContext.Provider value={{posts, createPost, getPosts, likePost, getPostById}}>
            { children }
        </PostContext.Provider>
    )
}