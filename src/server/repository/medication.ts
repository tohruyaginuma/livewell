import type { IMedicationRepository } from "@/server/domain/medication-repository";
import { Medication, type MedicationId } from "../domain/medication";

export class MedicationRepository implements IMedicationRepository {
  readonly #byId: Map<MedicationId, Medication>;

  constructor(medications: ReadonlyArray<Medication> = []) {
    // copy to avoid external mutations
    this.#byId = new Map(
      medications.map((m) => [m.id, new Medication(m.id, m.name)]),
    );
  }

  async findById(id: MedicationId): Promise<Medication | undefined> {
    const m = this.#byId.get(id);
    return m ? new Medication(m.id, m.name) : undefined;
  }

  async findByIds(ids: MedicationId[]): Promise<Medication[]> {
    const out: Medication[] = [];
    for (const id of ids) {
      const m = this.#byId.get(id);
      if (m) out.push(new Medication(m.id, m.name));
    }
    return out;
  }

  async create(medication: Medication): Promise<Medication> {
    if (this.#byId.has(medication.id)) {
      throw new Error(`Medication with id ${medication.id} already exists`);
    }
    const created = new Medication(medication.id, medication.name);
    this.#byId.set(created.id, created);
    return new Medication(created.id, created.name);
  }

  async edit(medication: Medication): Promise<Medication> {
    if (!this.#byId.has(medication.id)) {
      throw new Error(`Medication with id ${medication.id} not found`);
    }
    const updated = new Medication(medication.id, medication.name);
    this.#byId.set(updated.id, updated);
    return new Medication(updated.id, updated.name);
  }

  async delete(id: MedicationId): Promise<void> {
    this.#byId.delete(id);
  }
}
