"use client"
import React from "react";
import DirectMessageImage from "./DirectMessageImage";
import DirectMessageName from "./DirectMessageName";
import DirectMessageText from "./DirectMessageText";
import { useFetchChats } from "@/hooks/fetch-chats";
import { ChatEntity } from "@/entities/ChatEntity";
import { UserEntity } from "@/entities/UserEntity";
interface DirectMessageCardProps extends React.ComponentProps<"div">{
  chat: ChatEntity;
  user: UserEntity;
}

const DirectMessageCard = ({ chat, user, ...props }: DirectMessageCardProps) => {
  const [destinationUser, setDestinationUser] = React.useState<UserEntity | undefined>();
  const { fetchDestinationUserData } = useFetchChats();

  React.useEffect(() => {
    if(!destinationUser) {
      fetchDestinationUserData(chat, user).then(data => setDestinationUser(data));
    }
  }, [destinationUser])

  return (
    <div className="flex w-full p-4 gap-3 cursor-pointer mt-4" {...props}>
      <DirectMessageImage user={destinationUser!} chat={chat}/>
      <div className="flex flex-col">
        <DirectMessageName username={destinationUser?.username} />
        <DirectMessageText message="Lorem ipsum sit dor amet." />
      </div>
    </div>
  );
};

export default DirectMessageCard;
