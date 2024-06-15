import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserEntity } from "@/entities/UserEntity";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DirectMessageImageProps {
  user: UserEntity;
}

const DirectMessageImage = ({ user }: DirectMessageImageProps) => {
  return (
    <>
      <Link href={`/direct_message/${user?.id}`}>
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
