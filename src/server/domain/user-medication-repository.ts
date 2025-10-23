import type { UserId } from "@/server/domain/user";
import type {
  UserMedication,
  QuantityReceived,
  Dosage,
  Frequency,
  DaysSupply,
  StartDate,
  UserMedicationId,
} from "@/server/domain/user-medication";
import type { MedicationId } from "@/server/domain/medication";

export interface IUserMedicationRepository {
  findById(id: UserMedicationId): Promise<UserMedication | undefined>;
  findAllByUserId(userId: UserId): Promise<UserMedication[]>;
  create(
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: QuantityReceived,
    dosage: Dosage,
    frequency: Frequency,
    daysSupply: DaysSupply,
    startDate: StartDate,
  ): Promise<UserMedication>;
  update(
    id: UserMedicationId,
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: QuantityReceived,
    dosage: Dosage,
    frequency: Frequency,
    daysSupply: DaysSupply,
    startDate: StartDate,
  ): Promise<UserMedication>;
  delete(id: UserMedicationId): Promise<void>;
}
