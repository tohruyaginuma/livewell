import type { MedicationId, MedicationName } from "@/server/domain/medication";
import type { Medication } from "@/server/domain/medication";

export interface IMedicationRepository {
  findById(id: MedicationId): Promise<Medication | undefined>;
  findByIds(ids: MedicationId[]): Promise<Medication[]>;
  create(name: MedicationName): Promise<Medication>;
  update(id: MedicationId, name: MedicationName): Promise<Medication>;
  delete(id: MedicationId): Promise<void>;
}
