import { PostEntity } from "./PostEntity"

export interface UserEntity {
    id: string,
    username: string,
    password: string,
    email: string,
    avatarUrl?: string,
    bio?: string
    posts: PostEntity[]
    following: []
    followers: []
}