"use client";

import { CommentaryEntity } from "@/entities/CommentaryEntity";
import { api } from "@/services/api";

interface CreateCommentaryProps {
    content: string;
    postId: string;
    userId: string;
}
export default async function CreateCommentary({ content, postId, userId }: CreateCommentaryProps) {
    try {
        const CommentResponse = await api.post<CommentaryEntity>("/new/commentary", {
           postId,
           userId,
           content
        }).then(res => res.data);
        
      if(!CommentResponse) {
          return;
      }

      return CommentResponse;
      } catch (error) {
          console.log(error);
      }
}