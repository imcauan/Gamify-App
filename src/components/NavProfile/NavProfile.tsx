import { ProfileEntity } from "@/entities/ProfileEntity";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import UserDropdown from "../common/UserDropdown/UserDropdown";

interface ProfileProps {
  avatarUrl: string;
}

const NavProfile = ({ avatarUrl }: ProfileProps) => {
  return (
    <div>
      <Avatar>
        {avatarUrl}
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavProfile;
