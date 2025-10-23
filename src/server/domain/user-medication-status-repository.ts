import type { UserMedicationId } from "@/server/domain/user-medication";
import type {
  UserMedicationStatus,
  UserMedicationStatusId,
  TakenDate,
} from "@/server/domain/user-medication-status";

export interface IUserMedicationStatusRepository {
  findAllByUserMedicationId(
    userMedicationId: UserMedicationId,
  ): Promise<UserMedicationStatus[]>;
  findAllByUserMedicationIds(
    userMedicationIds: UserMedicationId[],
  ): Promise<UserMedicationStatus[]>;
  create(
    userMedicationId: UserMedicationId,
    takenDate: TakenDate,
  ): Promise<UserMedicationStatus>;
  delete(id: UserMedicationStatusId): Promise<void>;
  deleteAllByUserMedicationIds(
    userMedicationIds: UserMedicationId[],
  ): Promise<void>;
}
