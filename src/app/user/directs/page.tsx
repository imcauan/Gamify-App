"use client"

import DirectMessageCard from "@/components/cards/DirectMessageCard/DirectMessageCard";
import SearchInput from "@/components/common/SearchInput";
import { ChatEntity } from "@/entities/ChatEntity";
import { UserEntity } from "@/entities/UserEntity";
import { useFetchChats } from "@/hooks/fetch-chats";
import { useFetchUserById, useFetchUsers } from "@/hooks/get-users";
import useAuthContext from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Bell, CircleX } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { user } = useAuthContext();
  const { getAllChats } = useFetchChats();
  let search = ""
  const { data: chats } = useQuery({
    queryKey: ['chats'],
    queryFn: getAllChats
  })
  
  return (
    <div className="flex flex-col w-full lg:px-8 h-full">
      <div className="p-4 flex w-full justify-between">
        <div className="flex gap-2 lg:hidden">
          <Link href={"/home"}>
            <ArrowLeft
              className="text-white
             cursor-pointer hover:text-red-600"
            />
          </Link>
          <h1 className="text-lg text-white font-semibold">Directs</h1>
        </div>
        <Link href={"/user/notifications"}>
          <Bell className="text-white hover:text-red-600 cursor-pointer lg:hiddenl" />
        </Link>
      </div>
      <div className="w-full px-4">
        <SearchInput
          value={search}
          onChange={(e) => search = e.target.value}
        />
      </div>
      { chats && chats.length > 0 ? (
        chats?.map(chat => (
          <DirectMessageCard 
           key={chat.id} 
           chat={chat} 
           user={user!}
          />
        ))
      ) : (
      <div className="flex flex-col my-3 h-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-white">
              <CircleX className="text-red-600 text-center text-lg" />
              <h1 className="text-lg">You don't have any chats.</h1>
              <p className="text-zinc-800 text-md font-medium">Start a conversation!</p>
           </div>
      </div>
      )}
    </div>
  );
};

export default Page;
