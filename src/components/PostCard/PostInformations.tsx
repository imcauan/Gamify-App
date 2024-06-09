import { Avatar, AvatarFallback } from "../ui/avatar"
import { User } from "lucide-react"
import useAuthContext from "@/hooks/useAuthContext"
import { Button } from "../ui/button"
import { PostEntity } from "@/entities/PostEntity"
import { UserEntity } from "@/entities/UserEntity"

interface PostInformationProps {
  post: PostEntity;
}

const PostInformations = ({ post }: PostInformationProps) => {

  return (
    <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Avatar>
            { post.author.avatarUrl }
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        <p className="text-white font-semibold">{ post.author.username }</p>
        </div>
        <p className="text-white text-sm">{ post.location }</p>
    </div>
  )
}

export default PostInformations