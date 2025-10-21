import type { UserId } from "@/server/domain/user";
import type { UserMedicationId } from "@/server/domain/user-medication";

export type UserMedicationStatusId = number;

export class UserMedicationStatus {
  readonly #id: UserMedicationStatusId;
  readonly #userId: UserId;
  readonly #userMedicationId: UserMedicationId;
  readonly #taken: boolean;
  readonly #takenDate: string;

  constructor(
    id: UserMedicationStatusId,
    userId: UserId,
    userMedicationId: UserMedicationId,
    taken: boolean,
    takenDate: string,
  ) {
    this.#id = id;
    this.#userId = userId;
    this.#userMedicationId = userMedicationId;
    this.#taken = taken;
    this.#takenDate = takenDate;
  }

  get id(): UserMedicationStatusId {
    return this.#id;
  }

  get userId(): UserId {
    return this.#userId;
  }

  get userMedicationId(): UserMedicationId {
    return this.#userMedicationId;
  }

  get taken(): boolean {
    return this.#taken;
  }

  get takenDate(): string {
    return this.#takenDate;
  }
}
