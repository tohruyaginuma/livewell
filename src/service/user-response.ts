import type { User, UserId, UserName } from "@/domain/user";

export class UserResponse {
  readonly id: number;
  readonly name: string;

  constructor(id: UserId, name: UserName) {
    this.id = Number(id);
    this.name = String(name);
  }
}

export const fromDomain = (user: User): UserResponse => {
  return new UserResponse(user.id, user.name);
};
