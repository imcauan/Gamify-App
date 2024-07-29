import { ChatEntity } from "./ChatEntity";

export interface UserEntity {
    id: string,
    username: string,
    password: string,
    email: string,
    avatarUrl?: string,
    bio?: string,
    chats: ChatEntity[];
}