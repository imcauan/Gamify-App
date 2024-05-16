import { PostEntity } from "./PostEntity"
import { UserEntity } from "./UserEntity"

export interface CommunityEntity {
    id: string
    bio: string
    name: string
    owner: UserEntity
    posts: PostEntity[]
}