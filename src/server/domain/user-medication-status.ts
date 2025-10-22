import type { UserId } from "@/server/domain/user";
import type { UserMedicationId } from "@/server/domain/user-medication";

export type UserMedicationStatusId = number;

export class UserMedicationStatus {
  readonly #id: UserMedicationStatusId;
  readonly #userId: UserId;
  readonly #userMedicationId: UserMedicationId;
  readonly #takenDate: Date;

  constructor(
    id: UserMedicationStatusId,
    userId: UserId,
    userMedicationId: UserMedicationId,
    takenDate: Date,
  ) {
    this.#id = id;
    this.#userId = userId;
    this.#userMedicationId = userMedicationId;
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

  get takenDate(): Date {
    return this.#takenDate;
  }
}
