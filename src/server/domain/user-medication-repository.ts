import type { UserId } from "@/server/domain/user";
import type { UserMedication } from "@/server/domain/user-medication";

export interface IUserMedicationRepository {
  findAllByUserId(userId: UserId): Promise<UserMedication[]>;
}
