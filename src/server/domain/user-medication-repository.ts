import type { UserId } from "@/server/domain/user";
import type {
  UserMedication,
  UserMedicationId,
} from "@/server/domain/user-medication";

export interface IUserMedicationRepository {
  findAllByUserId(userId: UserId): Promise<UserMedication[]>;
  create(userMedication: UserMedication): Promise<UserMedication>;
  edit(userMedication: UserMedication): Promise<UserMedication>;
  delete(id: UserMedicationId): Promise<void>;
}
