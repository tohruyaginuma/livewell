import type { User, UserId } from "./user";

export interface IUserRepository {
  findById(id: UserId): Promise<User | undefined>;
}
