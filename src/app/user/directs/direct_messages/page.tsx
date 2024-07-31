"use client";

import MessageCard from "@/components/cards/MessageCard/MessageCard";
import NavProfile from "@/components/common/NavProfile/NavProfile";
import CreateMessageForm from "@/components/forms/CreateMessageForm";
import { UserEntity } from "@/entities/UserEntity";
import { useFetchChats } from "@/hooks/fetch-chats";
import { fetchMessages } from "@/hooks/fetch-messages";
import { useFetchUserById } from "@/hooks/get-users";
import useAuthContext from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { user } = useAuthContext();
  const userId = searchParams["userId"] ?? "";
  const chatId = searchParams["chatId"] ?? "";
  const [currentUser, setCurrentUser] = React.useState<UserEntity | null>(null);

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
    <div className="flex flex-col h-full justify-between w-full ">
      <header className="w-full top-0 sticky p-2 gap-2 flex items-center my-2">
        <Link href={"/user/directs"}>
          <ArrowLeft className="text-white cursor-pointer hover:text-red-600 lg:hidden" />
        </Link>
        <NavProfile avatarUrl={currentUser?.avatarUrl ?? ""} />
        <p className="text-sm text-white">{currentUser?.username}</p>
      </header>
      <div className="flex flex-col h-full text-white lg:justify-start p-4 gap-3">
        {messages ? (
          messages.map((x) => (
            <div className={x.authorId === user?.id ? "flex justify-end" : "flex justify-start"}>
              <MessageCard
                key={x.id}
                content={x.content}
                className={
                  x.authorId === user?.id
                    ? "bg-red-600 text-right rounded p-2"
                    : "bg-zinc-950 text-left rounded p-2"
                }
              />
            </div>
          ))
        ) : (
          <h1 className="text-white">No messages</h1>
        )}
      </div>
      <CreateMessageForm chatId={String(chatId)} />
    </div>
  );
};

export default Page;
