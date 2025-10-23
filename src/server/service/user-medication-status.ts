import type { IUserMedicationStatusRepository } from "../domain/user-medication-status-repository";
import type { UserMedicationStatus } from "../domain/user-medication-status";
import { DATE_FORMAT } from "@/shared/constants";
import dayjs from "dayjs";

export class UserMedicationStatusService {
  readonly #userMedicationStatusRepository: IUserMedicationStatusRepository;

  constructor(userMedicationStatusRepository: IUserMedicationStatusRepository) {
    this.#userMedicationStatusRepository = userMedicationStatusRepository;
  }

  async createUserMedicationStatus(
    userMedicationId: number,
    takenDate: Date,
  ): Promise<UserMedicationStatus> {
    const takenDateString = dayjs(takenDate).format(DATE_FORMAT);

    const userMedicationStatus =
      await this.#userMedicationStatusRepository.create(
        userMedicationId,
        takenDateString,
      );

    return userMedicationStatus;
  }

  async deleteUserMedicationStatus(
    userMedicationStatusId: number,
  ): Promise<void> {
    await this.#userMedicationStatusRepository.delete(userMedicationStatusId);
  }

  async deleteAllByUserMedicationIds(
    userMedicationIds: number[],
  ): Promise<void> {
    return this.#userMedicationStatusRepository.deleteAllByUserMedicationIds(
      userMedicationIds,
    );
  }
}
