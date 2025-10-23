import {
  Medication,
  type MedicationId,
  type MedicationName,
} from "@/server/domain/medication";

import type { IMedicationRepository } from "@/server/domain/medication-repository";

export class MedicationRepository implements IMedicationRepository {
  readonly #byId: Map<MedicationId, Medication>;
  #nextId: MedicationId;

  constructor(medications: ReadonlyArray<Medication> = []) {
    this.#byId = new Map(
      medications.map((m) => [m.id, new Medication(m.id, m.name)]),
    );
    const maxId =
      medications.length === 0 ? 0 : Math.max(...medications.map((m) => m.id));
    this.#nextId = (maxId + 1) as MedicationId;
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

  async create(name: MedicationName): Promise<Medication> {
    const id = this.#nextId;
    const medication = new Medication(id, name);
    this.#byId.set(id, medication);

    this.#nextId += 1;
    return medication;
  }

  async update(id: MedicationId, name: MedicationName): Promise<Medication> {
    if (!this.#byId.has(id)) {
      throw new Error(`Medication with id ${id} not found`);
    }

    const medication = new Medication(id, name);
    this.#byId.set(id, medication);
    return medication;
  }

  async delete(id: MedicationId): Promise<void> {
    if (!this.#byId.has(id)) {
      throw new Error(`Medication with id ${id} not found`);
    }

    this.#byId.delete(id);
  }
}
