import type { MedicationId } from "@/server/domain/medication";
import type { Medication } from "@/server/domain/medication";

export interface IMedicationRepository {
  findById(id: MedicationId): Promise<Medication | undefined>;
  findByIds(ids: MedicationId[]): Promise<Medication[]>;
  create(medication: Medication): Promise<Medication>;
  edit(medication: Medication): Promise<Medication>;
  delete(id: MedicationId): Promise<void>;
}
