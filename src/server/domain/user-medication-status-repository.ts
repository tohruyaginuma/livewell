import type { UserId } from "@/server/domain/user";
import type { UserMedicationStatus } from "@/server/domain/user-medication-status";

export interface IUserMedicationStatusRepository {
  findAllByUserId(userId: UserId): Promise<UserMedicationStatus[]>;
}
