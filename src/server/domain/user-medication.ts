import type { MedicationId } from "@/server/domain/medication";
import type { UserId } from "@/server/domain/user";

export type UserMedicationId = number;

export class UserMedication {
  readonly #id: UserMedicationId;
  readonly #userId: UserId;
  readonly #medicationId: MedicationId;
  readonly #quantityReceived: number;
  readonly #startDate: string;
  readonly #daysSupply: number;

  constructor(
    id: UserMedicationId,
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: number,
    startDate: string,
    daysSupply: number,
  ) {
    this.#id = id;
    this.#userId = userId;
    this.#medicationId = medicationId;
    this.#quantityReceived = quantityReceived;
    this.#startDate = startDate;
    this.#daysSupply = daysSupply;
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

  get startDate(): string {
    return this.#startDate;
  }

  get daysSupply(): number {
    return this.#daysSupply;
  }
}
