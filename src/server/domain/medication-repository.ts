import type { MedicationId } from "@/server/domain/medication";
import type { Medication } from "@/server/domain/medication";

export interface IMedicationRepository {
  findByIds(ids: MedicationId[]): Promise<Medication[]>;
}
