"use client";

import { CommentaryCard } from '@/components/cards/CommentaryCard';
import CreateCommentForm from '@/components/forms/CreateCommentForm';
import { CommentaryEntity } from '@/entities/CommentaryEntity';
import { usePostContext } from '@/hooks/usePostContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
  const [commentaries, setCommentaries] = React.useState<CommentaryEntity[] | null>(null)
  const { getPostById } = usePostContext();
  const { postId } = useParams();

  const handleCommentaries = async () => {
    if(Array.isArray(postId)) {
      return;
    }
    
    const RequestPost = await getPostById(postId);
    if(!RequestPost) {
      return;
    }

    setCommentaries(RequestPost.commentaries);
  }

  React.useEffect(() => {
    handleCommentaries();
  }, [])

  return (
    <div className='flex flex-col h-full justify-between'>
       <div className="flex p-3 mt-1 gap-3">
          <Link className="text-white text-lg" href="/home">
            <ArrowLeft />
          </Link>
          <h1 className="text-white font-semibold text-xl">Commentaries ({commentaries?.length})</h1>
        </div>
        <div className='flex flex-col gap-3 h-full'>
          { commentaries?.length === 0 ? (
            <div className='flex h-screen items-center text-center'>
              <h1 className='text-white font-semibold text-sm'>No commentaries</h1>
              <p className='text-zinc-900 text-xs'>Be the first to comment!</p>
            </div>
          ) : (
            commentaries?.map(comment => (
              <CommentaryCard.Root key={comment.id}>
                 <CommentaryCard.Image avatarUrl={comment.user.avatarUrl} />
                 <CommentaryCard.Content 
                   content={comment.content}
                   username={comment.user.username}
                   />
              </CommentaryCard.Root>
           )))}
           <CreateCommentForm postId={String(postId)}/>          
        </div>
    </div>
  )
}

export default Page