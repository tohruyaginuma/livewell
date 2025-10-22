export type UserMedicationId = number;
export type UserId = number;
export type MedicationId = number;
export type Frequency = number; // doses/day
export type DaysSupply = number; // days received
export type YmdDate = string; // "YYYY-MM-DD"

export class UserMedication {
  readonly #id: UserMedicationId;
  readonly #userId: UserId;
  readonly #medicationId: MedicationId;
  readonly #quantityReceived: number;
  readonly #dosage: number;
  readonly #frequency: Frequency;
  readonly #daysSupply: DaysSupply;
  readonly #startDate: YmdDate;

  constructor(
    id: UserMedicationId,
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: number,
    dosage: number,
    frequency: Frequency,
    daysSupply: DaysSupply,
    startDate: YmdDate, // "YYYY-MM-DD"
  ) {
    this.#id = id;
    this.#userId = userId;
    this.#medicationId = medicationId;
    this.#quantityReceived = quantityReceived;
    this.#dosage = dosage;
    this.#frequency = frequency;
    this.#daysSupply = daysSupply;
    this.#startDate = startDate;
  }

  get id() {
    return this.#id;
  }
  get userId() {
    return this.#userId;
  }
  get medicationId() {
    return this.#medicationId;
  }
  get quantityReceived() {
    return this.#quantityReceived;
  }
  get dosage() {
    return this.#dosage;
  }
  get frequency() {
    return this.#frequency;
  }
  get daysSupply() {
    return this.#daysSupply;
  }
  get startDate() {
    return this.#startDate;
  }
}
