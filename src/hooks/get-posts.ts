import { PostEntity } from "@/entities/PostEntity";
import { api } from "@/services/api";

export async function getPosts(): Promise<PostEntity[]> {
    const posts = await api.get<PostEntity[]>("/all/posts").then(res => res.data);

    return posts;
}