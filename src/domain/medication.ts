export type MedicationId = number;

export class Medication {
  readonly #id: MedicationId;
  readonly #name: string;

  constructor(id: MedicationId, name: string) {
    this.#id = id;
    this.#name = name;
  }

  get id(): MedicationId {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }
}
