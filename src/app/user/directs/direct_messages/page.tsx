import MessageCard from "@/components/cards/MessageCard/MessageCard";
import NavProfile from "@/components/common/NavProfile/NavProfile";
import CreateCommentForm from "@/components/forms/CreateCommentForm";
import CreateMessageForm from "@/components/forms/CreateMessageForm";
import { useFetchUserById } from "@/hooks/get-users";
import { ArrowLeft, CircleX } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const userId = searchParams["userId"] ?? "";
  const { messages, username, avatarUrl } = await useFetchUserById(userId);
  const filteredMessages = messages.filter((m) => m.destination === userId);

  return (
    <>
      <header className="w-full top-0 sticky p-2 gap-2 flex items-center lg:hidden my-2">
        <Link href={"/user/directs"}>
          <ArrowLeft className="text-white cursor-pointer hover:text-red-600" />
        </Link>
        <NavProfile avatarUrl={avatarUrl ?? ""} />
        <p className="text-sm text-white">{username}</p>
      </header>
      <div className="w-full h-full flex flex-col justify-center items-center text-white">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((m) => (
            <MessageCard key={m.authorId} content={m.content} />
          ))
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <CircleX className="text-red-600 text-center text-md" />
            <h1>No messages between you and {username}</h1>
            <p className="text-zinc-800 text-sm font-medium">Start a conversation!</p>
          </div>
        )}
      </div>
      <CreateMessageForm userId={userId}/>
    </>
  );
};

export default Page;
