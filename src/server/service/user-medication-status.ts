import type { IUserMedicationStatusRepository } from "../domain/user-medication-status-repository";
import { DATE_FORMAT } from "@/shared/constants";
import dayjs from "dayjs";
import { UserMedicationStatusListItemResponse } from "./user-medication-status-list-item-response";

export class UserMedicationStatusService {
  readonly #userMedicationStatusRepository: IUserMedicationStatusRepository;

  constructor(userMedicationStatusRepository: IUserMedicationStatusRepository) {
    this.#userMedicationStatusRepository = userMedicationStatusRepository;
  }

  async findAllByUserMedicationId(
    userMedicationId: number,
  ): Promise<UserMedicationStatusListItemResponse[]> {
    const userMedicationStatuses =
      await this.#userMedicationStatusRepository.findAllByUserMedicationId(
        userMedicationId,
      );
    return UserMedicationStatusListItemResponse.AllFromDomain(
      userMedicationStatuses,
    );
  }

  async createUserMedicationStatus(
    userMedicationId: number,
    takenDate: Date,
  ): Promise<UserMedicationStatusListItemResponse> {
    const takenDateString = dayjs(takenDate).format(DATE_FORMAT);

    const userMedicationStatus =
      await this.#userMedicationStatusRepository.create(
        userMedicationId,
        takenDateString,
      );

    return UserMedicationStatusListItemResponse.FromDomain(
      userMedicationStatus,
    );
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
