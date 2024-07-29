"use client";

import MessageCard from "@/components/cards/MessageCard/MessageCard";
import NavProfile from "@/components/common/NavProfile/NavProfile";
import CreateMessageForm from "@/components/forms/CreateMessageForm";
import { ChatEntity } from "@/entities/ChatEntity";
import { MessageEntity } from "@/entities/MessageEntity";
import { UserEntity } from "@/entities/UserEntity";
import { useFetchChats } from "@/hooks/fetch-chats";
import { fetchMessages } from "@/hooks/fetch-messages";
import { useFetchUserById } from "@/hooks/get-users";
import { getChatById } from "@/hooks/getChatById";
import useAuthContext from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3333");

// TODO: fix CSS and config socket.
const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { user } = useAuthContext();
  const userId = searchParams["userId"] ?? "";
  const chatId = searchParams["chatId"] ?? "";
  const [currentUser, setCurrentUser] = React.useState<UserEntity | null>(null);
  const { getAllChats } = useFetchChats();

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: () => fetchMessages(chatId),
  });

  React.useEffect(() => {
    if (!currentUser) {
      useFetchUserById(userId).then((data) => setCurrentUser(data));
    }
  }, [currentUser]);

  return (
    <>
      <header className="w-full top-0 sticky p-2 gap-2 flex items-center lg:hidden my-2">
        <Link href={"/user/directs"}>
          <ArrowLeft className="text-white cursor-pointer hover:text-red-600" />
        </Link>
        <NavProfile avatarUrl={currentUser?.avatarUrl ?? ""} />
        <p className="text-sm text-white">{currentUser?.username}</p>
      </header>
      <div className="flex flex-col text-white">
        {messages ? (
          messages.map((x) => (
            <MessageCard
              key={x.id}
              content={x.content}
              className={
                x.authorId === user?.id
                  ? "right-0 text-right rounded"
                  : "bg-zinc-850 left-0 text-left rounded"
              }
            />
          ))
        ) : (
          <h1 className="text-white">No messages</h1>
        )}
      </div>
      <CreateMessageForm chatId={String(chatId)} />
    </>
  );
};

export default Page;
