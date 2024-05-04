import { ProfileEntity } from "@/entities/ProfileEntity"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User } from "lucide-react"

interface ProfileProps {
    imageUrl?: string
}

const NavProfile = ({ imageUrl }: ProfileProps) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={imageUrl} className="bg-white" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default NavProfile