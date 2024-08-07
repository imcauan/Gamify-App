import { CommentaryEntity } from "@/entities/CommentaryEntity";
import { PostEntity } from "@/entities/PostEntity";
import { api } from "@/services/api";

export async function useFetchCommentaries(postId: string) {
    const params = new URLSearchParams();
    params.append("postId", postId)

    const response = await api
    .get<PostEntity>(`/get/post`, {
        params
    })
    .then(res => res.data);

    return response.commentaries 
}

export async function CreateCommentary(content: string, postId: string, userId: string) {
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