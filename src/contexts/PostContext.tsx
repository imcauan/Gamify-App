"use client"

import { CommentaryEntity } from "@/entities/CommentaryEntity";
import { PostEntity } from "@/entities/PostEntity";
import useAuthContext from "@/hooks/useAuthContext";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import React from "react";

interface PostContextProps {
    posts: PostEntity[];
    createPost: ({ location, caption, tags, image }: PostEntity) => Promise<PostEntity | void>;
    getPostById: (postId: string) => Promise<PostEntity | void>;
    getCommentariesByPostId: (postId: string) => Promise<CommentaryEntity[] | void>
    getPosts: () => Promise<void>;
    commentPost : ({ content }: { content: string}, postId: string, userId: string) => Promise<CommentaryEntity | void>;
    likePost: (authorId: string, postId: string) => Promise<void>;
    savePost: (postId: string, userId: string) => Promise<void>;
}

export const PostContext = React.createContext(
    {} as PostContextProps
)

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = React.useState<PostEntity[]>([]);  
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
        console.log(postId);
        const post = await api.post<PostEntity>("/get/post", {
           postId,
        }).then(res => res.data);

        if(!post) {
            return;
        }

        return post
    }
    // "/new/commentary", "/edit/commentary/:id", "/delete/commentary/:id", and so on...

    const getCommentariesByPostId = async (postId: string) => {
        const post = await getPostById(postId);
        
        if(!post) {
            return;
        }
        return post.commentaries;
    }

    const likePost = async (authorId: string, postId: string) => {
       const response = await api
       .post("/new/like", {
         authorId,
         postId
       })
       .then(res => res.data);

       if(!response) {
         return;
       }
    }

    const commentPost = async ({ content }: { content: string }, postId: string, userId: string) => {
        try {
          const CommentResponse = await api.post<CommentaryEntity>("/new/commentary", {
             postId,
             userId,
             content
          }).then(res => res.data);
          
        if(!CommentResponse) {
            return;
        }

        return CommentResponse;
        } catch (error) {
            console.log(error);
        }

    }

    const savePost = async (postId: string, userId: string) => {
        const savePostResponse = await api.post(`/save/post`, {
            postId,
            userId
        }).then(res => res.data);

        if(!savePostResponse) {
            return;
        }

        return savePostResponse
    }

    return (
        <PostContext.Provider value={{posts, createPost, getPosts, likePost, getPostById, commentPost, getCommentariesByPostId, savePost}}>
            { children }
        </PostContext.Provider>
    )
}