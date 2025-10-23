import "server-only";

import { User } from "@/server/domain/user";
import {
  medications,
  userMedicationStatuses,
  userMedications,
  users,
} from "@/infra/data";
import { UserRepository } from "@/server/repository/user";
import { UserService } from "@/server/service/user";
import { UserMedicationRepository } from "@/server/repository/user-medication";
import { UserMedicationService } from "@/server/service/user-medication";
import { UserMedication } from "../domain/user-medication";
import { Medication } from "../domain/medication";
import { MedicationRepository } from "../repository/medication";
import { UserMedicationStatus } from "../domain/user-medication-status";
import { UserMedicationStatusRepository } from "../repository/user-medication-status";
import { UserMedicationStatusService } from "../service/user-medication-status";

const domainUsers: User[] = users.map((user) => new User(user.id, user.name));

const domainUserMedications: UserMedication[] = userMedications.map(
  (userMedication) => {
    return new UserMedication(
      userMedication.id,
      userMedication.userId,
      userMedication.medicationId,
      userMedication.quantityReceived,
      userMedication.dosage,
      userMedication.frequency,
      userMedication.daysSupply,
      userMedication.startDate,
    );
  },
);

const domainMedications: Medication[] = medications.map(
  (medication) => new Medication(medication.id, medication.name),
);

const domainUserMedicationStatuses: UserMedicationStatus[] =
  userMedicationStatuses.map((userMedicationStatus) => {
    return new UserMedicationStatus(
      userMedicationStatus.id,
      userMedicationStatus.userMedicationId,
      userMedicationStatus.takenDate,
    );
  });

const userRepository = new UserRepository(domainUsers);
const userMedicationRepository = new UserMedicationRepository(
  domainUserMedications,
);
const medicationRepository = new MedicationRepository(domainMedications);
const userMedicationStatusRepository = new UserMedicationStatusRepository(
  domainUserMedicationStatuses,
);

const userService = new UserService(userRepository);
const userMedicationService = new UserMedicationService(
  userMedicationRepository,
  medicationRepository,
  userMedicationStatusRepository,
);

const userMedicationStatusService = new UserMedicationStatusService(
  userMedicationStatusRepository,
);

export const container = {
  userService,
  userMedicationService,
  userMedicationStatusService,
};
