import { MessageEntity } from "./MessageEntity";

export interface ChatEntity {
    id: string;
    members: string[];
    messages: MessageEntity[];
}