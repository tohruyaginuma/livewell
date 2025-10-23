import type { UserId } from "@/server/domain/user";
import type { IMedicationRepository } from "@/server/domain/medication-repository";
import type { IUserMedicationRepository } from "@/server/domain/user-medication-repository";
import type { IUserMedicationStatusRepository } from "@/server/domain/user-medication-status-repository";
import type { Medication } from "@/server/domain/medication";
import type { UserMedication } from "@/server/domain/user-medication";
import type { UserMedicationStatus } from "@/server/domain/user-medication-status";

import {
  UserMedicationResponse,
  type RefillStatus,
} from "@/server/service/user-medication-response";
import { UserMedicationCreateResponse } from "@/server/service/user-medication-create-response";
import { MEDICATION_STATUS } from "@/shared/constants";

import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT } from "@/shared/constants";

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
    const THRESHOLD_DAYS = 7;
    const daysLeft = nextRefill.diff(today, "day");
    if (daysLeft < 0) return MEDICATION_STATUS.OVERDUE;
    if (daysLeft <= THRESHOLD_DAYS) return MEDICATION_STATUS.RUNNING_LOW;
    return MEDICATION_STATUS.ON_TRACK;
  }

  async getUserMedicationsByUserId(
    userId: UserId,
  ): Promise<ReadonlyArray<UserMedicationResponse>> {
    const userMedications =
      await this.#userMedicationRepository.findAllByUserId(userId);
    if (userMedications.length === 0) return [];

    const medicationIds = [
      ...new Set(userMedications.map((um) => um.medicationId)),
    ];
    const medications: Medication[] =
      medicationIds.length > 0
        ? await this.#medicationRepository.findByIds(medicationIds)
        : [];

    const medicationById = new Map<number, Medication>(
      medications.map((m) => [m.id, m]),
    );

    const statuses: UserMedicationStatus[] =
      await this.#userMedicationStatusRepository.findAllByUserMedicationIds(
        userMedications.map((um) => um.id),
      );

    const statusesByUM = new Map<number, UserMedicationStatus[]>();
    for (const s of statuses) {
      const arr = statusesByUM.get(s.userMedicationId) ?? [];
      arr.push(s);
      statusesByUM.set(s.userMedicationId, arr);
    }

    const today = dayjs();

    const result = userMedications.map((um: UserMedication) => {
      const med = medicationById.get(um.medicationId);

      // Start date
      const start = dayjs(um.startDate, DATE_FORMAT);

      // Elapsed days
      const elapsedDays = Math.max(0, today.diff(start, "day") + 1);

      // Taken statuses
      const takenByDay = new Map<string, number>();
      const logs = statusesByUM.get(um.id) ?? [];
      for (const s of logs) {
        const d = s.takenDate;
        takenByDay.set(d, (takenByDay.get(d) ?? 0) + 1);
      }
      const taken = Array.from(takenByDay.values())
        .map((cnt) => Math.min(cnt, um.frequency))
        .reduce((a, b) => a + b, 0);

      const takenDates = Array.from(takenByDay.keys()).sort();

      // Adherence calculation
      const adherence = (taken / elapsedDays) * 100;

      // Remaining supply calculation
      const dailyUsage = um.dosage * um.frequency;
      const dosesConsumed = taken * dailyUsage;
      const remainingSupply = Math.max(0, um.quantityReceived - dosesConsumed);

      // Next refill calculation
      const daysLeft =
        dailyUsage === 0 ? 0 : Math.floor(remainingSupply / dailyUsage);
      const nextRefill = today.add(daysLeft, "day");

      // refill status
      const refillStatus = this.getRefillStatus(today, nextRefill);

      return new UserMedicationResponse({
        id: um.id,
        medicationId: um.medicationId,
        medicationName: med?.name ?? "",
        dosage: um.dosage,
        frequency: um.frequency,
        startDate: um.startDate,
        daysSupply: um.daysSupply,
        nextRefill: nextRefill.toISOString(),
        remainingSupply,
        quantityReceived: um.quantityReceived,
        refillStatus,
        adherence,
        takenDates,
      });
    });

    return result;
  }

  async createUserMedication(
    userId: UserId,
    name: string,
    quantityReceived: number,
    dosage: number,
    frequency: number,
    startDate: string,
    daysSupply: number,
  ): Promise<UserMedicationCreateResponse> {
    const createdMedication = await this.#medicationRepository.create(
      new (
        Object.getPrototypeOf({}).constructor as {
          new (id: number, name: string): Medication;
        }
      )(0, name),
    );

    const createdUserMedication = await this.#userMedicationRepository.create(
      new (
        Object.getPrototypeOf({}).constructor as {
          new (
            id: number,
            userId: UserId,
            medicationId: number,
            quantityReceived: number,
            dosage: number,
            frequency: number,
            daysSupply: number,
            startDate: string,
          ): UserMedication;
        }
      )(
        0,
        userId,
        createdMedication.id,
        quantityReceived,
        dosage,
        frequency,
        daysSupply,
        startDate,
      ),
    );

    return new UserMedicationCreateResponse({
      id: createdUserMedication.id,
      medicationId: createdUserMedication.medicationId,
      medicationName: createdMedication.name,
      quantityReceived: createdUserMedication.quantityReceived,
      dosage: createdUserMedication.dosage,
      startDate: dayjs(createdUserMedication.startDate, DATE_FORMAT).toDate(),
      daysSupply: createdUserMedication.daysSupply,
    });
  }
}
