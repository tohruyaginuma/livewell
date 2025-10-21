import type { User, UserId } from "@/server/domain/user";

export interface IUserRepository {
  findById(id: UserId): Promise<User | undefined>;
}
