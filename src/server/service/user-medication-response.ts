export class UserMedicationResponse {
  readonly id: number;
  readonly medicationId: number;
  readonly dosage: number;
  readonly frequency: number;
  readonly startDate: string;
  readonly daysSupply: number;

  constructor({
    id,
    medicationId,
    dosage,
    frequency,
    startDate,
    daysSupply,
  }: {
    id: number;
    medicationId: number;
    dosage: number;
    frequency: number;
    startDate: string;
    daysSupply: number;
  }) {
    this.id = id;
    this.medicationId = medicationId;
    this.dosage = dosage;
    this.frequency = frequency;
    this.startDate = startDate;
    this.daysSupply = daysSupply;
  }
}
