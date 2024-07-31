import { ChatEntity } from "@/entities/ChatEntity";
import { api } from "@/services/api";

export async function getChatById(id: string): Promise<ChatEntity> {
    const params = new URLSearchParams()
    params.append("chatId", id)
    const request = await api.get<ChatEntity>('/get/chat', {
        params
    }).then(res => res.data);
    
    return request;
}