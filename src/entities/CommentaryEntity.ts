import { UserEntity } from "./UserEntity";

export interface CommentaryEntity {
    id: string;
    postId: string;
    user: UserEntity;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}