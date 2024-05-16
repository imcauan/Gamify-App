"use client"

import { CommunityEntity } from "@/entities/CommunityEntity";
import { PostEntity } from "@/entities/PostEntity"
import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { ReactNode, createContext, useState } from "react";

interface UserContextProps {
    createPost: (file: File[], tags: string, caption: string, user: UserEntity) => void;
    createCommunity: () => Promise<CommunityEntity | void>; 
    followUser: () => void;
}

export const UserContext = createContext(
    {} as UserContextProps
)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [isFollowing, setIsFollowinge] = useState(false);
    // const router = useRouter();
    const createPost = async (file: File[], tags: string, caption: string, user: UserEntity) => {
        const newPost = await api
        .post<PostEntity>("/new/post", {
            user,
            tags,
            caption,
            file
        }).then((res) => res.data)

        user.posts.push(newPost);
        // router.push("/home")

        console.log("Post criado", newPost);
    }

    const followUser = async () => {}

    const createCommunity = async () => {}
    return (
        <UserContext.Provider value={{createPost, createCommunity, followUser}}>
            { children }
        </UserContext.Provider>
    )
}