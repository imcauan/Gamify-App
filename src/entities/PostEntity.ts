import { CommentaryEntity } from "./CommentaryEntity";
import { LikeEntity } from "./LikeEntity";
import { UserEntity } from "./UserEntity";

export interface PostEntity {
    id: string;
    caption: string;
    image: File;
    location: string;
    tags: string;
    author: UserEntity;
    likes: LikeEntity[];
    commentaries: CommentaryEntity[];
    createdAt: Date;
}