import dayjs from "dayjs";

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

export const userMedications = [
  {
    id: 1,
    userId: users[0].id,
    medicationId: medications[0].id,
    quantityReceived: 300,
    startDate: dayjs().subtract(10, "day").toDate(),
    dosage: 2,
  },
  {
    id: 2,
    userId: users[0].id,
    medicationId: medications[1].id,
    quantityReceived: 30,
    startDate: dayjs().subtract(2, "day").toDate(),
    dosage: 2,
  },
  {
    id: 3,
    userId: users[0].id,
    medicationId: medications[1].id,
    quantityReceived: 30,
    startDate: dayjs().subtract(10, "day").toDate(),
    dosage: 2,
  },
  {
    id: 4,
    userId: users[0].id,
    medicationId: medications[1].id,
    quantityReceived: 30,
    startDate: dayjs().subtract(10, "day").toDate(),
    dosage: 10,
  },
];

export const userMedicationStatus = [
  {
    id: 1,
    userId: users[0].id,
    userMedicationId: userMedications[0].id,
    takenDate: dayjs().subtract(10, "day").toDate(),
  },
  {
    id: 2,
    userId: users[0].id,
    userMedicationId: userMedications[0].id,
    takenDate: dayjs().subtract(9, "day").toDate(),
  },
  {
    id: 3,
    userId: users[0].id,
    userMedicationId: userMedications[0].id,
    takenDate: dayjs().subtract(8, "day").toDate(),
  },
];
