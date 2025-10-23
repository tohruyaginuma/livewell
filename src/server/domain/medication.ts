export type MedicationId = number;
export type MedicationName = string;

export class Medication {
  readonly #id: MedicationId;
  readonly #name: MedicationName;

  constructor(id: MedicationId, name: MedicationName) {
    this.#id = id;
    this.#name = name;
  }

  get id(): MedicationId {
    return this.#id;
  }

  get name(): MedicationName {
    return this.#name;
  }
}
