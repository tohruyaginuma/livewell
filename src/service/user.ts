import type { UserId } from "@/domain/user";
import type { IUserRepository } from "@/domain/user-repository";
import { fromDomain, UserResponse } from "@/service/user-response";
import { NotFoundError } from "@/shared/errors";

export class UserService {
  readonly #userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.#userRepository = userRepository;
  }

  async findById(id: UserId): Promise<UserResponse> {
    const user = await this.#userRepository.findById(id);
    console.log("user service", user);
    if (!user) {
      throw new NotFoundError(`User not found (id=${id})`);
    }
    return fromDomain(user);
  }
}
