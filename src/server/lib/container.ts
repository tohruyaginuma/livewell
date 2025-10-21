import "server-only";

import { User } from "@/server/domain/user";
import { users } from "@/server/infra/data";
import { UserRepository } from "@/server/repository/user";
import { UserService } from "@/server/service/user";

const domainUsers: ReadonlyArray<User> = users.map(
  (user) => new User(user.id, user.name),
);
const userRepository = new UserRepository(domainUsers);
const userService = new UserService(userRepository);

export const container = { userService };
