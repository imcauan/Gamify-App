import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";

export default async function useGetUsers():Promise<UserEntity[] | null> {
    const users = api
    .get<UserEntity[]>("/all/users")
    .then(res => res.data);

    return users
}