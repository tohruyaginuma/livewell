import dayjs from "dayjs";

export const users = [{ id: 1, name: "John Doe 1" }];

export const medications = [
  { id: 1, name: "Medication 1" },
  { id: 2, name: "Medication 2" },
  { id: 3, name: "Medication 3" },
];

export const userMedications = [
  {
    id: 1,
    userId: users[0].id,
    medicationId: medications[0].id,
    quantityReceived: 300,
    dosage: 2,
    frequency: 2,
    daysSupply: 30,
    startDate: dayjs().subtract(10, "day").format("YYYY-MM-DD"),
  },
  {
    id: 2,
    userId: users[0].id,
    medicationId: medications[1].id,
    quantityReceived: 60,
    dosage: 1,
    frequency: 1,
    daysSupply: 60,
    startDate: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
  },
  {
    id: 3,
    userId: users[0].id,
    medicationId: medications[2].id,
    quantityReceived: 90,
    dosage: 3,
    frequency: 3,
    daysSupply: 30,
    startDate: dayjs().subtract(20, "day").format("YYYY-MM-DD"),
  },
];

export const userMedicationStatuses = [
  {
    id: 1,
    userMedicationId: userMedications[0].id,
    takenDate: dayjs().subtract(10, "day").format("YYYY-MM-DD"),
  },
  {
    id: 2,
    userMedicationId: userMedications[0].id,
    takenDate: dayjs().subtract(9, "day").format("YYYY-MM-DD"),
  },
  {
    id: 3,
    userMedicationId: userMedications[0].id,
    takenDate: dayjs().subtract(8, "day").format("YYYY-MM-DD"),
  },
  {
    id: 4,
    userMedicationId: userMedications[1].id,
    takenDate: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
  },
  {
    id: 5,
    userMedicationId: userMedications[1].id,
    takenDate: dayjs().subtract(4, "day").format("YYYY-MM-DD"),
  },
];
