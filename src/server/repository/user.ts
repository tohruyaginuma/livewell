import type { User, UserId } from "@/server/domain/user";
import type { IUserRepository } from "@/server/domain/user-repository";

export class UserRepository implements IUserRepository {
  readonly #users: ReadonlyArray<User>;

  constructor(users: ReadonlyArray<User>) {
    this.#users = users;
  }

  async findById(id: UserId): Promise<User | undefined> {
    return this.#users.find((user) => user.id === id);
  }
}
