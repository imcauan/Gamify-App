import { MessageEntity } from "@/entities/MessageEntity";
import { getChatById } from "./getChatById";

export async function fetchMessages(chatId: string): Promise<MessageEntity[] | null> {
    const chat = await getChatById(chatId);
 
    if(!chat) {
        return null;
    }

    return chat.messages;
}