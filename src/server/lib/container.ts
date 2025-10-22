import "server-only";

import { User } from "@/server/domain/user";
import {
  medications,
  userMedicationStatus,
  userMedications,
  users,
} from "@/server/infra/data";
import { UserRepository } from "@/server/repository/user";
import { UserService } from "@/server/service/user";
import { UserMedicationRepository } from "@/server/repository/user-medication";
import { UserMedicationService } from "@/server/service/user-medication";
import { UserMedication } from "../domain/user-medication";
import { Medication } from "../domain/medication";
import { MedicationRepository } from "../repository/medication";
import { UserMedicationStatus } from "../domain/user-medication-status";
import { UserMedicationStatusRepository } from "../repository/user-medication-status";

const domainUsers: ReadonlyArray<User> = users.map(
  (user) => new User(user.id, user.name),
);

const domainUserMedications: ReadonlyArray<UserMedication> =
  userMedications.map((userMedication) => {
    return new UserMedication(
      userMedication.id,
      userMedication.userId,
      userMedication.medicationId,
      userMedication.quantityReceived,
      userMedication.dosage,
      userMedication.startDate,
    );
  });

const domainMedications: ReadonlyArray<Medication> = medications.map(
  (medication) => new Medication(medication.id, medication.name),
);

const domainUserMedicationStatus: ReadonlyArray<UserMedicationStatus> =
  userMedicationStatus.map((userMedicationStatus) => {
    return new UserMedicationStatus(
      userMedicationStatus.id,
      userMedicationStatus.userId,
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
  domainUserMedicationStatus,
);

const userService = new UserService(userRepository);
const userMedicationService = new UserMedicationService(
  userMedicationRepository,
  medicationRepository,
  userMedicationStatusRepository,
);

export const container = { userService, userMedicationService };
