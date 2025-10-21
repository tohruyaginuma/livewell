import type { UserId } from "@/domain/user";
import type { UserMedication } from "@/domain/user-medication";

export interface IUserMedicationRepository {
  findAllByUserId(userId: UserId): Promise<UserMedication[]>;
}
