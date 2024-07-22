
"use client"

import { MessageEntity } from "@/entities/MessageEntity";
import { api } from "@/services/api";
import useAuthContext from "./useAuthContext";

interface MessageRequest {
  message: string;
  chatId: string,
  authorId: string;
}

export async function CreateMessage(data: MessageRequest): Promise<MessageEntity | undefined> {
  try {
    const MessageRequest = await api
      .post<MessageEntity>("/new/message", {
        authorId: data.authorId,
        content: data.message,
        chatId: data.chatId
      })
      .then((res) => res.data);

      return MessageRequest
  } catch (error) {
    console.log(error);
  }
}
