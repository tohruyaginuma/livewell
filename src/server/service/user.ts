import type { UserId } from "@/server/domain/user";
import type { IUserRepository } from "@/server/domain/user-repository";
import { fromDomain, UserResponse } from "@/server/service/user-response";
import { NotFoundError } from "@/shared/errors";

export class UserService {
  readonly #userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.#userRepository = userRepository;
  }

  async findById(id: UserId): Promise<UserResponse> {
    const user = await this.#userRepository.findById(id);
    if (!user) {
      throw new NotFoundError(`User not found (id=${id})`);
    }
    return fromDomain(user);
  }
}
