import { UserId } from "../domain/user";
import { UserMedicationStatus } from "../domain/user-medication-status";
import type { IUserMedicationStatusRepository } from "../domain/user-medication-status-repository";

export class UserMedicationStatusRepository
  implements IUserMedicationStatusRepository
{
  readonly #userMedicationStatus: ReadonlyArray<UserMedicationStatus>;

  constructor(userMedicationStatus: ReadonlyArray<UserMedicationStatus>) {
    this.#userMedicationStatus = userMedicationStatus;
  }

  async findAllByUserId(userId: UserId): Promise<UserMedicationStatus[]> {
    const userMedicationStatus = this.#userMedicationStatus
      .filter((userMedicationStatus) => userMedicationStatus.userId === userId)
      .map(
        (userMedicationStatus) =>
          new UserMedicationStatus(
            userMedicationStatus.id,
            userMedicationStatus.userId,
            userMedicationStatus.userMedicationId,
            userMedicationStatus.takenDate,
          ),
      );

    return userMedicationStatus;
  }
}
