import type { UserId } from "@/domain/user";
import { UserMedication } from "@/domain/user-medication";
import type { IUserMedicationRepository } from "@/domain/user-medication-repository";

export class UserMedicationRepository implements IUserMedicationRepository {
  readonly #userMedications: ReadonlyArray<UserMedication>;

  constructor(userMedications: ReadonlyArray<UserMedication>) {
    this.#userMedications = userMedications;
  }

  async findAllByUserId(userId: UserId): Promise<UserMedication[]> {
    return this.#userMedications
      .filter((userMedication) => userMedication.userId === userId)
      .map(
        (userMedication) =>
          new UserMedication(
            userMedication.id,
            userMedication.userId,
            userMedication.medicationId,
            userMedication.quantityReceived,
            userMedication.startDate,
            userMedication.daysSupply,
          ),
      );
  }
}
