import type { Medication } from "@/server/domain/medication";
import type { IMedicationRepository } from "@/server/domain/medication-repository";
import type { IUserMedicationRepository } from "@/server/domain/user-medication-repository";
import type { IUserMedicationStatusRepository } from "@/server/domain/user-medication-status-repository";
import type { UserId } from "@/server/domain/user";
import type { UserMedicationStatus } from "@/server/domain/user-medication-status";
import { UserMedicationResponse } from "@/server/service/user-medication-response";
import type { UserMedication } from "@/server/domain/user-medication";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { MEDICATION_STATUS } from "@/shared/constants";
import type { RefillStatus } from "@/server/service/user-medication-response";

dayjs.extend(utc);

export class UserMedicationService {
  readonly #userMedicationRepository: IUserMedicationRepository;
  readonly #medicationRepository: IMedicationRepository;
  readonly #userMedicationStatusRepository: IUserMedicationStatusRepository;

  constructor(
    userMedicationRepository: IUserMedicationRepository,
    medicationRepository: IMedicationRepository,
    userMedicationStatusRepository: IUserMedicationStatusRepository,
  ) {
    this.#userMedicationRepository = userMedicationRepository;
    this.#medicationRepository = medicationRepository;
    this.#userMedicationStatusRepository = userMedicationStatusRepository;
  }

  private getRefillStatus(today: Dayjs, nextRefill: Dayjs): RefillStatus {
    const daysLeft = nextRefill.diff(today, "day");

    const THRESHOLD_DAYS = 7;

    if (daysLeft <= 0) {
      return MEDICATION_STATUS.OVERDUE;
    } else if (daysLeft <= THRESHOLD_DAYS) {
      return MEDICATION_STATUS.RUNNING_LOW;
    } else {
      return MEDICATION_STATUS.ON_TRACK;
    }
  }

  async getUserMedicationsByUserId(
    userId: UserId,
  ): Promise<ReadonlyArray<UserMedicationResponse>> {
    const userMedications =
      await this.#userMedicationRepository.findAllByUserId(userId);

    if (userMedications.length === 0) {
      return [];
    }

    const medicationIds = [
      ...new Set(userMedications.map((um) => um.medicationId)),
    ];

    const [medications, userMedicationStatus] = await Promise.all([
      medicationIds.length > 0
        ? this.#medicationRepository.findByIds(medicationIds)
        : Promise.resolve<Medication[]>([]),
      this.#userMedicationStatusRepository.findAllByUserId(userId),
    ]);

    console.log("userMedicationStatus", userMedicationStatus);

    const medicationById = new Map<number, Medication>(
      medications.map((m) => [m.id, m]),
    );

    const statusByUserMedicationId = new Map<number, UserMedicationStatus>(
      userMedicationStatus.map((s) => [s.userMedicationId, s]),
    );

    console.log("statusByUserMedicationId", statusByUserMedicationId);

    const result: UserMedicationResponse[] = userMedications.map(
      (um: UserMedication) => {
        const med = medicationById.get(um.medicationId);
        const st = statusByUserMedicationId.get(um.id);

        const start = dayjs(um.startDate);
        const today = dayjs();
        const spanDays = today.diff(start, "day");
        console.log("um.startDate", um.startDate);
        console.log("start", start);
        console.log("today", today);
        console.log("spanDays", spanDays);

        const daysLeft = um.quantityReceived / (um.dosage * spanDays);
        const nextRefill = today.add(daysLeft, "day");

        const refillStatus = this.getRefillStatus(today, nextRefill);

        const remainingSupply = um.quantityReceived - spanDays * um.dosage;

        const adherence = st?.takenDate ? 100 : 0;

        return new UserMedicationResponse({
          id: um.id,
          medicationId: um.medicationId,
          medicationName: med?.name ?? "",
          nextRefill: nextRefill.toDate(),
          remainingSupply: remainingSupply < 0 ? 0 : remainingSupply,
          quantityReceived: um.quantityReceived,
          refillStatus,
          adherence,
        });
      },
    );

    return result;
  }
}
