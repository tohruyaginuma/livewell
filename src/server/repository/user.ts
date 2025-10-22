import type { User, UserId } from "@/server/domain/user";
import type { IUserRepository } from "@/server/domain/user-repository";

export class UserRepository implements IUserRepository {
  readonly #byId: ReadonlyMap<UserId, User>;

  constructor(users: ReadonlyArray<User>) {
    const copy = [...users];
    this.#byId = new Map(copy.map((u) => [u.id, u]));
  }

  async findById(id: UserId): Promise<User | undefined> {
    return this.#byId.get(id);
  }
}
