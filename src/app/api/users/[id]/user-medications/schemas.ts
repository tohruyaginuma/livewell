import z from "zod";

export const UserMedicationCreateSchema = z.object({
  name: z.string(),
  dosage: z.coerce.number().positive(),
  frequency: z.coerce.number().int().positive(),
  startDate: z.coerce.date(),
  quantityReceived: z.coerce.number().int().positive(),
  daysSupply: z.coerce.number().int().positive(),
});
