import type { User, UserId } from "@/domain/user";

export interface IUserRepository {
  findById(id: UserId): Promise<User | undefined>;
}
