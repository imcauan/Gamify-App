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

    return response as PostEntity
}