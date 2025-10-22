import type { UserId } from "@/server/domain/user";
import type {
  UserMedication,
  UserMedicationId,
} from "@/server/domain/user-medication";
import type { IUserMedicationRepository } from "@/server/domain/user-medication-repository";

export class UserMedicationRepository implements IUserMedicationRepository {
  readonly #byId: Map<UserMedicationId, UserMedication>;

  constructor(userMedications: ReadonlyArray<UserMedication> = []) {
    this.#byId = new Map(userMedications.map((u) => [u.id, u]));
  }

  async findById(id: UserMedicationId): Promise<UserMedication | undefined> {
    return this.#byId.get(id);
  }

  async findAllByUserId(userId: UserId): Promise<UserMedication[]> {
    return Array.from(this.#byId.values()).filter((um) => um.userId === userId);
  }

  async create(userMedication: UserMedication): Promise<UserMedication> {
    if (this.#byId.has(userMedication.id)) {
      throw new Error(
        `UserMedication with id ${userMedication.id} already exists`,
      );
    }
    this.#byId.set(userMedication.id, userMedication);
    return userMedication;
  }

  async edit(userMedication: UserMedication): Promise<UserMedication> {
    if (!this.#byId.has(userMedication.id)) {
      throw new Error(`UserMedication with id ${userMedication.id} not found`);
    }
    this.#byId.set(userMedication.id, userMedication);
    return userMedication;
  }

  async delete(id: UserMedicationId): Promise<void> {
    this.#byId.delete(id);
  }
}
