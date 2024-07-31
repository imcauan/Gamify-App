import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatEntity } from "@/entities/ChatEntity";
import { UserEntity } from "@/entities/UserEntity";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DirectMessageImageProps {
  chat: ChatEntity
  user: UserEntity
}

const DirectMessageImage = ({ chat, user }: DirectMessageImageProps) => {
  return (
    <>
      <Link href={`/user/directs/direct_messages?userId=${user?.id}&chatId=${chat.id}`}>
        <Avatar>
          {user?.avatarUrl}
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </Link>
    </>
  );
};

export default DirectMessageImage;
