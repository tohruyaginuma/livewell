import type { UserMedicationId } from "@/server/domain/user-medication";
import type {
  UserMedicationStatus,
  UserMedicationStatusId,
} from "@/server/domain/user-medication-status";
import type { IUserMedicationStatusRepository } from "@/server/domain/user-medication-status-repository";

export class UserMedicationStatusRepository
  implements IUserMedicationStatusRepository
{
  readonly #byId: Map<UserMedicationStatusId, UserMedicationStatus>;

  constructor(userMedicationStatus: ReadonlyArray<UserMedicationStatus> = []) {
    const copy = [...userMedicationStatus];
    this.#byId = new Map(copy.map((s) => [s.id, s]));
  }

  async findById(
    id: UserMedicationStatusId,
  ): Promise<UserMedicationStatus | undefined> {
    return this.#byId.get(id);
  }

  async findAllByUserMedicationIds(
    userMedicationIds: UserMedicationId[],
  ): Promise<UserMedicationStatus[]> {
    const out: UserMedicationStatus[] = [];
    for (const id of userMedicationIds) {
      const statuses = Array.from(this.#byId.values()).filter(
        (s) => s.userMedicationId === id,
      );
      out.push(...statuses);
    }
    return out;
  }

  async create(
    userMedicationStatus: UserMedicationStatus,
  ): Promise<UserMedicationStatus> {
    if (this.#byId.has(userMedicationStatus.id)) {
      throw new Error(
        `UserMedicationStatus with id ${userMedicationStatus.id} already exists`,
      );
    }
    this.#byId.set(userMedicationStatus.id, userMedicationStatus);
    return userMedicationStatus;
  }

  async delete(id: UserMedicationStatusId): Promise<void> {
    this.#byId.delete(id);
  }
}
