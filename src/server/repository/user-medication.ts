import type { UserId } from "@/server/domain/user";
import { UserMedication } from "@/server/domain/user-medication";
import type { IUserMedicationRepository } from "@/server/domain/user-medication-repository";

export class UserMedicationRepository implements IUserMedicationRepository {
  readonly #userMedications: ReadonlyArray<UserMedication>;

  constructor(userMedications: ReadonlyArray<UserMedication>) {
    this.#userMedications = userMedications;
  }

  async findAllByUserId(userId: UserId): Promise<UserMedication[]> {
    const userMedications = this.#userMedications
      .filter((userMedication) => userMedication.userId === userId)
      .map(
        (userMedication) =>
          new UserMedication(
            userMedication.id,
            userMedication.userId,
            userMedication.medicationId,
            userMedication.quantityReceived,
            userMedication.dosage,
            userMedication.startDate,
          ),
      );

    return userMedications;
  }
}
