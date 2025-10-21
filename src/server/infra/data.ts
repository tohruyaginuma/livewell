import { FREQUENCY } from "@/shared/constants";

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
    id: 1,
    name: "Medication 1",
  },
  {
    id: 2,
    name: "Medication 2",
  },
  {
    id: 3,
    name: "Medication 3",
  },
];

export const userMedication = [
  {
    id: 1,
    userId: users[0].id,
    medicationId: medications[0].id,
    quantityReceived: 10,
    startDate: new Date().toISOString(),
    dosage: 10,
    frequency: FREQUENCY.DAILY,
    daysSupply: 30,
  },
];

export const userMedicationStatus = [
  {
    id: 1,
    userId: users[0].id,
    userMedicationId: userMedication[0].id,
    taken: true,
    takenDate: new Date().toISOString(),
  },
];
