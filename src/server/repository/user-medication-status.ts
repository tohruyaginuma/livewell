import type { UserMedicationId } from "@/server/domain/user-medication";
import {
  UserMedicationStatus,
  type UserMedicationStatusId,
  type TakenDate,
} from "@/server/domain/user-medication-status";
import type { IUserMedicationStatusRepository } from "@/server/domain/user-medication-status-repository";

export class UserMedicationStatusRepository
  implements IUserMedicationStatusRepository
{
  readonly #byId: Map<UserMedicationStatusId, UserMedicationStatus>;
  #nextId: UserMedicationStatusId;

  constructor(userMedicationStatus: ReadonlyArray<UserMedicationStatus> = []) {
    this.#byId = new Map(userMedicationStatus.map((s) => [s.id, s]));

    const maxId =
      userMedicationStatus.length === 0
        ? 0
        : Math.max(...userMedicationStatus.map((s) => s.id));
    this.#nextId = (maxId + 1) as UserMedicationStatusId;
  }

  async findAllByUserMedicationId(
    userMedicationId: UserMedicationId,
  ): Promise<UserMedicationStatus[]> {
    const statuses = Array.from(this.#byId.values()).filter(
      (s) => s.userMedicationId === userMedicationId,
    );
    return statuses;
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
    userMedicationId: UserMedicationId,
    takenDate: TakenDate,
  ): Promise<UserMedicationStatus> {
    const id = this.#nextId;
    this.#nextId += 1;
    const userMedicationStatus = new UserMedicationStatus(
      id,
      userMedicationId,
      takenDate,
    );
    this.#byId.set(id, userMedicationStatus);
    return userMedicationStatus;
  }

  async delete(id: UserMedicationStatusId): Promise<void> {
    if (!this.#byId.has(id)) {
      throw new Error(`UserMedicationStatus with id ${id} not found`);
    }
    this.#byId.delete(id);
  }

  async deleteAllByUserMedicationIds(
    userMedicationIds: ReadonlyArray<UserMedicationId>,
  ): Promise<void> {
    const idsSet = new Set(userMedicationIds);
    const deleteTargets: UserMedicationStatusId[] = [];

    for (const [id, status] of this.#byId.entries()) {
      if (idsSet.has(status.userMedicationId)) {
        deleteTargets.push(id);
      }
    }

    for (const id of deleteTargets) {
      this.#byId.delete(id);
    }
  }
}
