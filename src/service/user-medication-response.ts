import type { UserMedication } from "@/domain/user-medication";

export class UserMedicationResponse {
  readonly id: number;
  readonly userId: number;
  readonly medicationId: number;
  readonly quantityReceived: number;
  readonly startDate: string;
  readonly daysSupply: number;

  constructor(
    id: number,
    userId: number,
    medicationId: number,
    quantityReceived: number,
    startDate: string,
    daysSupply: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.medicationId = medicationId;
    this.quantityReceived = quantityReceived;
    this.startDate = startDate;
    this.daysSupply = daysSupply;
  }
}

export const fromDomain = (
  userMedication: UserMedication,
): UserMedicationResponse => {
  return new UserMedicationResponse(
    userMedication.id,
    userMedication.userId,
    userMedication.medicationId,
    userMedication.quantityReceived,
    userMedication.startDate,
    userMedication.daysSupply,
  );
};
