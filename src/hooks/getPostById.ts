import { PostEntity } from "@/entities/PostEntity";
import { api } from "@/services/api";

export async function getPostById(id: string): Promise<PostEntity | null> {
    const params = new URLSearchParams()
    params.append("id", id)
    
    const request = await api.get<PostEntity>("/get/post", {
        params
    }).then(res => res.data);

    if(!request) {
        return null;
    }

    return request
}