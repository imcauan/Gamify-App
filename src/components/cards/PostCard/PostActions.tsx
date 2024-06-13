import { PostEntity } from '@/entities/PostEntity'
import { UserEntity } from '@/entities/UserEntity'
import { usePostContext } from '@/hooks/usePostContext'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PostActionsProps {
  post: PostEntity
}

const PostActions = ({ post }: PostActionsProps) => {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const { likePost } = usePostContext();

  const handleLike = async () => {
    await likePost(post.author.id, post.id);

    setIsLiked(!isLiked);
  }  

  const handleSavePost = async () => {}
  return (
    <div className='flex items-center justify-between w-full space-y-2 '>
      <div className='flex gap-2 cursor-pointer'>
        <Heart 
          className={isLiked ? "text-red-600" : "text-white"} 
          onClick={handleLike} 
        />
        <Link href={`/post/commentaries/${post.id}`}>
          <MessageCircle className="text-white" />
        </Link>
      </div>
      <Bookmark className="text-white" onClick={handleSavePost}/>
    </div>
  )
}

export default PostActions