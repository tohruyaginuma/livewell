import type { UserMedicationId } from "@/server/domain/user-medication";
import type {
  UserMedicationStatus,
  UserMedicationStatusId,
} from "@/server/domain/user-medication-status";

export interface IUserMedicationStatusRepository {
  findById(
    id: UserMedicationStatusId,
  ): Promise<UserMedicationStatus | undefined>;
  findAllByUserMedicationIds(
    userMedicationIds: UserMedicationId[],
  ): Promise<UserMedicationStatus[]>;
  create(
    userMedicationStatus: UserMedicationStatus,
  ): Promise<UserMedicationStatus>;
  delete(id: UserMedicationStatusId): Promise<void>;
}
