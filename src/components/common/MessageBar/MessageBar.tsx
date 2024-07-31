"use client";

import DirectMessageCard from "@/components/cards/DirectMessageCard/DirectMessageCard";
import { ChatEntity } from "@/entities/ChatEntity";
import { useFetchChats } from "@/hooks/fetch-chats";
import useAuthContext from "@/hooks/useAuthContext";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import SearchInput from "../SearchInput";

export function MessageBar() {
  const [chats, setChats] = React.useState<ChatEntity[]>([]);
  const { user } = useAuthContext();
  const { getAllChats } = useFetchChats();

  React.useEffect(() => {
    getAllChats().then((data) => setChats(data ?? []));
  }, []);

  return (
    <div className="hidden lg:flex flex-col bg-zinc-950 text-white right-0 top-0 sticky min-w-80 rounded-l-xl rounded-bl-xl p-3 gap-2">
      <div className="flex gap-3 w-full px-4 mt-6 text-left">
        <Link href={"/home"}>
          <Home className="cursor-pointer hover:text-neutral-400" />
        </Link>
        <h1 className="text-red-600 font-bold text-xl">Directs</h1>
      </div>
      <SearchInput />
      {chats ? (
        chats?.map((chat) => (
          <DirectMessageCard key={chat.id} chat={chat} user={user!} />
        ))
      ) : (
        <h1>No messages</h1>
      )}
    </div>
  );
}
