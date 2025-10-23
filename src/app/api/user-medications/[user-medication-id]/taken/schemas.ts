import z from "zod";

export const UserMedicationStatusCreateSchema = z.object({
  takenDate: z.coerce.date(),
});
