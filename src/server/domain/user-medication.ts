import type { MedicationId } from "@/server/domain/medication";
import type { UserId } from "@/server/domain/user";

export type UserMedicationId = number;

export class UserMedication {
  readonly #id: UserMedicationId;
  readonly #userId: UserId;
  readonly #medicationId: MedicationId;
  readonly #quantityReceived: number;
  readonly #dosage: number;
  readonly #startDate: Date;

  constructor(
    id: UserMedicationId,
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: number,
    dosage: number,
    startDate: Date,
  ) {
    this.#id = id;
    this.#userId = userId;
    this.#medicationId = medicationId;
    this.#quantityReceived = quantityReceived;
    this.#dosage = dosage;
    this.#startDate = startDate;
  }

  get id(): UserMedicationId {
    return this.#id;
  }

  get userId(): UserId {
    return this.#userId;
  }

  get medicationId(): MedicationId {
    return this.#medicationId;
  }

  get quantityReceived(): number {
    return this.#quantityReceived;
  }

  get startDate(): Date {
    return this.#startDate;
  }

  get dosage(): number {
    return this.#dosage;
  }
}
