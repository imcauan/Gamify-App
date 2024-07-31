
"use client"

import { MessageEntity } from "@/entities/MessageEntity";
import { api } from "@/services/api";
import useAuthContext from "./useAuthContext";

interface MessageRequest {
  content: string;
  chatId: string,
  authorId: string;
}

export async function CreateMessage({ authorId, chatId, content }: MessageRequest): Promise<MessageEntity | undefined> {
  try {
    const MessageRequest = await api
      .post<MessageEntity>("/new/message", {
        authorId,
        content,
        chatId
      })
      .then((res) => res.data);

      return MessageRequest
  } catch (error) {
    console.log(error);
  }
}
