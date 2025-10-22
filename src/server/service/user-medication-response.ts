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
  readonly nextRefill: Date;
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
    nextRefill: Date;
    refillStatus: RefillStatus;
    adherence: number;
    quantityReceived: number;
  }) {
    this.id = id;
    this.medicationId = medicationId;
    this.medicationName = medicationName;
    this.remainingSupply = remainingSupply;
    this.nextRefill = nextRefill;
    this.refillStatus = refillStatus;
    this.adherence = adherence;
    this.quantityReceived = quantityReceived;
  }
}
