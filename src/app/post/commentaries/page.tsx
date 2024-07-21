"use client"

import { CommentaryCard } from '@/components/cards/CommentaryCard';
import CreateCommentForm from '@/components/forms/CreateCommentForm';
import { PostEntity } from '@/entities/PostEntity';
import { useFetchCommentaries } from '@/hooks/fetch-commentaries';
import { getPosts } from '@/hooks/get-posts';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Page = ({ 
  searchParams,
}:{
  searchParams: { [key: string]: string | undefined }
}) => {
  const postId = searchParams['postId'] ?? "";
  const {data: commentaries} = useQuery({
    queryKey: ['commentaries'],
    queryFn: () => useFetchCommentaries(postId)
  })
  return (
    <div className='flex flex-col h-full justify-between lg:w-full'>
       <div className="flex p-3 mt-1 gap-3">
          <Link className="text-white text-lg" href="/home">
            <ArrowLeft /> 
          </Link>
          <h1 className="text-white font-semibold text-xl">Commentaries ({commentaries?.length})</h1>
        </div>
        <div className='flex flex-col gap-3 h-full'>
          { commentaries ? (
            commentaries?.map(comment => (
              <CommentaryCard.Root key={comment.id}>
                 <CommentaryCard.Image avatarUrl={comment.user?.avatarUrl} />
                 <CommentaryCard.Content 
                   content={comment.content}
                   username={comment.user?.username!}
                 />
              </CommentaryCard.Root>
           ))
          ) : (
            <div className='flex h-screen items-center text-center'>
              <h1 className='text-white font-semibold text-sm'>No commentaries</h1>
              <p className='text-zinc-900 text-xs'>Be the first to comment!</p>
            </div>
           )}
           <CreateCommentForm postId={String(postId)}/>          
        </div>
    </div>
  )
}

export default Page