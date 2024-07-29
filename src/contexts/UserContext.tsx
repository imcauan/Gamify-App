"use client";

import { CommunityEntity } from "@/entities/CommunityEntity";
import { MessageEntity } from "@/entities/MessageEntity";
import { PostEntity } from "@/entities/PostEntity";
import useAuthContext from "@/hooks/useAuthContext";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import React from "react";

interface UserContextProps {
  createMessage: (text: string, chatId: string) => Promise<MessageEntity | undefined>;
}

export const UserContext = React.createContext({} as UserContextProps);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();
  const router = useRouter();

 async function createMessage(text: string, chatId: string): Promise<MessageEntity | undefined> {
    try {
      const MessageRequest = await api
        .post<MessageEntity>("/new/message", {
          authorId: user?.id!,
          content: text,
          chatId
        })
        .then((res) => res.data);
  
        return MessageRequest;
    } catch (error) {
      console.log(error);
    }
  }


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
  };


  const createCommunity = async () => {};
  return (
    <UserContext.Provider value={{ createMessage }}>
      {children}
    </UserContext.Provider>
  );
};
