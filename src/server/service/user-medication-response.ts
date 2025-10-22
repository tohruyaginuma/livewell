import { MEDICATION_STATUS } from "@/shared/constants";

export type RefillStatus =
  | typeof MEDICATION_STATUS.OVERDUE
  | typeof MEDICATION_STATUS.ON_TRACK
  | typeof MEDICATION_STATUS.RUNNING_LOW;

export class UserMedicationResponse {
  readonly id: number;
  readonly medicationId: number;
  readonly medicationName: string;
  readonly remainingSupply: number;
  readonly nextRefill: string;
  readonly refillStatus: RefillStatus;
  readonly adherence: number;
  readonly quantityReceived: number;

  constructor({
    id,
    medicationId,
    medicationName,
    remainingSupply,
    nextRefill,
    refillStatus,
    adherence,
    quantityReceived,
  }: {
    id: number;
    medicationId: number;
    medicationName: string;
    remainingSupply: number;
    nextRefill: string;
    refillStatus: RefillStatus;
    adherence: number;
    quantityReceived: number;
  }) {
    this.id = id;
    this.medicationId = medicationId;
    this.medicationName = medicationName;
    this.remainingSupply = Math.max(0, remainingSupply);
    this.nextRefill = nextRefill;
    this.refillStatus = refillStatus;
    this.adherence = Math.min(100, Math.max(0, Math.round(adherence)));
    this.quantityReceived = quantityReceived;
  }

  toJSON() {
    return {
      id: this.id,
      medicationId: this.medicationId,
      medicationName: this.medicationName,
      remainingSupply: this.remainingSupply,
      nextRefill: this.nextRefill,
      refillStatus: this.refillStatus,
      adherence: this.adherence,
      quantityReceived: this.quantityReceived,
    };
  }
}
