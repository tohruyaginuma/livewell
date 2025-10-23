import { UserMedicationStatus } from "../domain/user-medication-status";

export class UserMedicationStatusListItemResponse {
  readonly id: number;
  readonly takenDate: string;

  constructor({ id, takenDate }: { id: number; takenDate: string }) {
    this.id = id;
    this.takenDate = takenDate;
  }

  static FromDomain(
    userMedicationStatus: UserMedicationStatus,
  ): UserMedicationStatusListItemResponse {
    return new UserMedicationStatusListItemResponse({
      id: userMedicationStatus.id,
      takenDate: userMedicationStatus.takenDate,
    });
  }

  static AllFromDomain(
    userMedicationStatuses: UserMedicationStatus[],
  ): UserMedicationStatusListItemResponse[] {
    return userMedicationStatuses.map(
      (s) => new UserMedicationStatusListItemResponse(s),
    );
  }
}
