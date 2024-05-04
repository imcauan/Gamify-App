import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

interface ProfilePictureProps {
    avatarUrl?: string
}

const ProfilePicture = (props: ProfilePictureProps) => {
  return (
    <div>
      <Avatar>
        { props.avatarUrl }
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfilePicture;
