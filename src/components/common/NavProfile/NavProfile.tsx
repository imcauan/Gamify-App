import { ProfileEntity } from "@/entities/ProfileEntity";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User } from "lucide-react";
import UserDropdown from "../UserDropdown/UserDropdown";

interface ProfileProps {
  avatarUrl: string;
}

const NavProfile = ({ avatarUrl }: ProfileProps) => {
  return (
    <div>
      <Avatar>
        {avatarUrl}
        <AvatarFallback>
          <User className="text-black"/>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavProfile;
