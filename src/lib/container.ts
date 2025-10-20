import "server-only";

import { User } from "@/domain/user";
import { users } from "@/infra/data";
import { UserRepository } from "@/repository/user";
import { UserService } from "@/service/user";

const domainUsers: ReadonlyArray<User> = users.map(
  (user) => new User(user.id, user.name),
);
const userRepository = new UserRepository(domainUsers);
const userService = new UserService(userRepository);

export const container = { userService };
