import { UserEntity } from "@/entities/UserEntity";
import { api } from "@/services/api";

export async function useFetchUsers(): Promise<UserEntity[] | null> {
  const users = await api
    .get<UserEntity[]>("/all/users")
    .then((res) => res.data);

  return users;
}

export async function useFetchUserById(userId: string) {
  const params = new URLSearchParams();
  params.append("userId", userId);

  const response = await api
    .get<UserEntity>("/get/user", {
      params,
    })
    .then((res) => res.data);

  return response as UserEntity;
}
