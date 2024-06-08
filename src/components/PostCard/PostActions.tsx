import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react'
import React from 'react'

const PostActions = () => {

  return (
    <div className='flex items-center justify-between w-full space-y-2'>
      <div className='flex gap-4'>
        <Heart className="text-white" />
        <MessageCircle className="text-white" />
        <Send className="text-white" />
      </div>
      <Bookmark className="text-white" />
    </div>
  )
}

export default PostActions