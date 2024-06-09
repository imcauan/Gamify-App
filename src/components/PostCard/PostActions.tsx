import { LikeEntity } from '@/entities/LikeEntity'
import { PostEntity } from '@/entities/PostEntity'
import { usePostContext } from '@/hooks/usePostContext'
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PostActionsProps {
  post: PostEntity
}

const PostActions = ({post}: PostActionsProps) => {
  const [likes, setLikes] = React.useState<LikeEntity[]>(post.likes)
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const { likePost } = usePostContext();
  
  const handleLike = async () => {
    const like = await likePost(post.author.id, post.id);

    if(!like) {
      return;
    }

    setIsLiked(true);
  }

  const handleCommentary = async () => {}
  const handleSendPost = async () => {}
  const handleSavePost = async () => {}
  return (
    <div className='flex items-center justify-between w-full space-y-2 '>
      <div className='flex gap-2 cursor-pointer'>
        <Heart 
          className={`${ isLiked ? "text-red-600" : "text-white" }`} 
          onClick={handleLike} 
        />
        <span className='text-white'>{likes.length}</span>
        <Link href={`/post/${post.id}/commentaries`}>
          <MessageCircle className="text-white" onClick={handleCommentary} />
        </Link>
        <span className='text-white'>{post.commentaries.length}</span>
      </div>
      <Bookmark className="text-white" onClick={handleSavePost}/>
    </div>
  )
}

export default PostActions