import type { UserId } from "@/domain/user";
import { UserMedication } from "@/domain/user-medication";
import type { IUserMedicationRepository } from "@/domain/user-medication-repository";

export class UserMedicationService {
  readonly #userMedicationRepository: IUserMedicationRepository;

  constructor(userMedicationRepository: IUserMedicationRepository) {
    this.#userMedicationRepository = userMedicationRepository;
  }

  async getUserMedicationsByUserId(userId: UserId): Promise<UserMedication[]> {
    const userMedications =
      await this.#userMedicationRepository.findAllByUserId(userId);
    return userMedications.map(
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
