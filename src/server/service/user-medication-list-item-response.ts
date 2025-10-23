import type { MEDICATION_STATUS } from "@/shared/constants";

export type RefillStatus =
  | typeof MEDICATION_STATUS.OVERDUE
  | typeof MEDICATION_STATUS.ON_TRACK
  | typeof MEDICATION_STATUS.RUNNING_LOW;

export class UserMedicationListItemResponse {
  readonly id: number;
  readonly medicationId: number;
  readonly medicationName: string;
  readonly remainingSupply: number;
  readonly nextRefill: string;
  readonly refillStatus: RefillStatus;
  readonly adherence: number;
  readonly quantityReceived: number;
  readonly dosage: number;
  readonly frequency: number;
  readonly startDate: string;
  readonly daysSupply: number;
  readonly takenDates: {
    id: number;
    takenDate: string;
  }[];

  constructor({
    id,
    medicationId,
    medicationName,
    remainingSupply,
    nextRefill,
    refillStatus,
    adherence,
    quantityReceived,
    dosage,
    frequency,
    startDate,
    daysSupply,
    takenDates,
  }: {
    id: number;
    medicationId: number;
    medicationName: string;
    remainingSupply: number;
    nextRefill: string;
    refillStatus: RefillStatus;
    adherence: number;
    quantityReceived: number;
    dosage: number;
    frequency: number;
    startDate: string;
    daysSupply: number;
    takenDates: {
      id: number;
      takenDate: string;
    }[];
  }) {
    this.id = id;
    this.medicationId = medicationId;
    this.medicationName = medicationName;
    this.remainingSupply = Math.max(0, remainingSupply);
    this.nextRefill = nextRefill;
    this.refillStatus = refillStatus;
    this.adherence = Math.min(100, Math.max(0, Math.round(adherence)));
    this.quantityReceived = quantityReceived;
    this.dosage = dosage;
    this.frequency = frequency;
    this.startDate = startDate;
    this.daysSupply = daysSupply;
    this.takenDates = takenDates.map((takenDate) => ({
      id: takenDate.id,
      takenDate: takenDate.takenDate,
    }));
  }
}
