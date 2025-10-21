export type UserId = number;
export type UserName = string;

export class User {
  readonly #id: UserId;
  readonly #name: UserName;

  constructor(id: UserId, name: UserName) {
    this.#id = id;
    this.#name = name;
  }

  get id(): UserId {
    return this.#id;
  }

  get name(): UserName {
    return this.#name;
  }
}
