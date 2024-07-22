"use client";

import DirectMessageCard from "@/components/cards/DirectMessageCard/DirectMessageCard";
import { useFetchChats } from "@/hooks/fetch-chats";
import useAuthContext from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export function MessageBar() {
  const { user } = useAuthContext();
  const { getAllChats } = useFetchChats();
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: getAllChats,
  });
  return (
    <div className="hidden lg:flex flex-col bg-zinc-950 text-white right-0 top-0 sticky w-80 rounded-l-xl rounded-bl-xl">
      <div className="w-full px-4 mt-6 text-left">
        <h1 className="text-red-600 font-bold text-xl">Directs</h1>
      </div>
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
