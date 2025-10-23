import type { UserMedicationId } from "@/server/domain/user-medication";

export type UserMedicationStatusId = number;
export type TakenDate = string;

export class UserMedicationStatus {
  readonly #id: UserMedicationStatusId;
  readonly #userMedicationId: UserMedicationId;
  readonly #takenDate: TakenDate;

  constructor(
    id: UserMedicationStatusId,
    userMedicationId: UserMedicationId,
    takenDate: TakenDate,
  ) {
    this.#id = id;
    this.#userMedicationId = userMedicationId;
    this.#takenDate = takenDate;
  }

  get id() {
    return this.#id;
  }
  get userMedicationId() {
    return this.#userMedicationId;
  }
  get takenDate() {
    return this.#takenDate;
  }
}
