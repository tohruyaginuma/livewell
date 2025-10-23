import type { UserId } from "@/server/domain/user";
import { UserMedication } from "@/server/domain/user-medication";
import type { IUserMedicationRepository } from "@/server/domain/user-medication-repository";
import type { MedicationId } from "@/server/domain/medication";
import type {
  UserMedicationId,
  QuantityReceived,
  Dosage,
  Frequency,
  DaysSupply,
  StartDate,
} from "@/server/domain/user-medication";

export class UserMedicationRepository implements IUserMedicationRepository {
  readonly #byId: Map<UserMedicationId, UserMedication>;
  #nextId: UserMedicationId;

  constructor(userMedications: ReadonlyArray<UserMedication> = []) {
    this.#byId = new Map(userMedications.map((u) => [u.id, u]));

    const maxId =
      userMedications.length === 0
        ? 0
        : Math.max(...userMedications.map((u) => u.id));
    this.#nextId = (maxId + 1) as UserMedicationId;
  }
  async findById(id: UserMedicationId): Promise<UserMedication | undefined> {
    return this.#byId.get(id);
  }

  async findAllByUserId(userId: UserId): Promise<UserMedication[]> {
    return Array.from(this.#byId.values()).filter((um) => um.userId === userId);
  }

  async create(
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: QuantityReceived,
    dosage: Dosage,
    frequency: Frequency,
    daysSupply: DaysSupply,
    startDate: StartDate,
  ): Promise<UserMedication> {
    const id = this.#nextId;
    this.#nextId += 1;
    const userMedication = new UserMedication(
      id,
      userId,
      medicationId,
      quantityReceived,
      dosage,
      frequency,
      daysSupply,
      startDate,
    );
    this.#byId.set(id, userMedication);
    return userMedication;
  }

  async update(
    id: UserMedicationId,
    userId: UserId,
    medicationId: MedicationId,
    quantityReceived: QuantityReceived,
    dosage: Dosage,
    frequency: number,
    daysSupply: DaysSupply,
    startDate: StartDate,
  ): Promise<UserMedication> {
    if (!this.#byId.has(id)) {
      throw new Error(`UserMedication with id ${id} not found`);
    }
    const userMedication = new UserMedication(
      id,
      userId,
      medicationId,
      quantityReceived,
      dosage,
      frequency,
      daysSupply,
      startDate,
    );

    this.#byId.set(id, userMedication);
    return userMedication;
  }

  async delete(id: UserMedicationId): Promise<void> {
    this.#byId.delete(id);
  }
}
