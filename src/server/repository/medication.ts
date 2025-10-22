import { Medication, MedicationId } from "@/server/domain/medication";

export class MedicationRepository {
  readonly #medications: ReadonlyArray<Medication>;

  constructor(medications: ReadonlyArray<Medication>) {
    this.#medications = medications;
  }

  async findByIds(ids: MedicationId[]): Promise<Medication[]> {
    const medications = this.#medications
      .filter((medication) => ids.includes(medication.id))
      .map((medication) => new Medication(medication.id, medication.name));

    return medications;
  }
}
