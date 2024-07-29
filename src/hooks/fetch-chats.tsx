"use client"

import React from "react";
import { useFetchUserById } from "./get-users";
import { ChatEntity } from "@/entities/ChatEntity";
import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";
import useAuthContext from "./useAuthContext";

export function useFetchChats() {
  const { user } = useAuthContext();
  const getAllChats = async () => {
    const fetchAllChats = await api
      .get<ChatEntity[]>("/all/chats")
      .then((res) => res.data);

    for (const chat of fetchAllChats) {
      if (chat.members.includes(user?.id!)) {
        return fetchAllChats as ChatEntity[];
      }
    }
  };

  const fetchDestinationUserData = async (
    chat: ChatEntity,
    user: UserEntity
  ) => {
    const destinationId = chat.members.find((id) => id !== user?.id);
    try {
      const DestinationRequest = await useFetchUserById(destinationId!);
      return DestinationRequest as UserEntity;
    } catch (error) {
      console.log(error);
    }
  };

  return { useFetchChats, fetchDestinationUserData, getAllChats };
}
