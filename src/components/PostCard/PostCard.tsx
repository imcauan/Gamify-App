import { UserEntity } from "@/entities/UserEntity"
import ProfilePicture from "./Profile/ProfilePicture"
import { Button } from "../ui/button"
import { useState } from "react"
import { Bookmark, Heart, MessageSquare, Save, Send } from "lucide-react"
import ProfileUsername from "./Profile/ProfileUsername"
import PostSubtitle from "./PostSubtitle"
import PostImage from "./PostImage"

interface PostProps {
    author: UserEntity,
    subtitle: string,
    imageUrl: string,
}

const PostCard = (props: PostProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className="flex flex-col gap-3 mt-4 space-y-2 p-4">
        <div className="flex w-full justify-between">
            <div className="flex text-white items-center gap-3">
              <ProfilePicture avatarUrl={props.author.avatarUrl}/>
              <ProfileUsername username={props.author.username} />
            </div>
            <Button 
              onClick={() => setIsFollowing(!isFollowing)}
              className="font-bold text-base bg-red-600 text-white rounded-xl hover:bg-red-800"
            >
              { !isFollowing ? "Follow" : "Following" }
            </Button>
        </div>
        <PostImage imageUrl={props.imageUrl} />
        <div className="w-full flex justify-between">
          <div className="flex gap-3">
           <Heart className="text-xs text-white"/>
           <MessageSquare className="text-xs text-white" />
           <Send className="text-xs text-white"/>
          </div>
          <div>
           <Bookmark className="text-white text-xs"/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <PostSubtitle 
            subtitle={ props.subtitle }
          />
        </div>
    </div>
  )
}

export default PostCard