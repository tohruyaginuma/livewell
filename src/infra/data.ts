import { MedicationStatus } from "@/domain/medication";

export const users = [
  {
    id: 1,
    name: "John Doe 1",
  },
  {
    id: 2,
    name: "John Doe 2",
  },
  {
    id: 3,
    name: "John Doe 3",
  },
];

export const medications = [
  {
    id: "1",
    name: "Medication 1",
    dosage: "10mg",
    frequency: "daily",
    startDate: new Date().toISOString(),
    quantityReceived: 10,
    daysSupply: 30,
    user: users[0],
    status: MedicationStatus.ON_TRACK,
  },
];
