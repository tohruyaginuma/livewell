export class UserMedicationCreateResponse {
  readonly id: number;
  readonly medicationId: number;
  readonly medicationName: string;
  readonly quantityReceived: number;
  readonly dosage: number;
  readonly startDate: string;
  readonly daysSupply: number;

  constructor({
    id,
    medicationId,
    medicationName,
    quantityReceived,
    dosage,
    startDate,
    daysSupply,
  }: {
    id: number;
    medicationId: number;
    medicationName: string;
    quantityReceived: number;
    dosage: number;
    startDate: Date;
    daysSupply: number;
  }) {
    this.id = id;
    this.medicationId = medicationId;
    this.medicationName = medicationName;
    this.quantityReceived = quantityReceived;
    this.dosage = dosage;
    this.startDate = startDate.toISOString();
    this.daysSupply = daysSupply;
  }
}
