import z from "zod";

export const UserMedicationCreateSchema = z.object({
  name: z.string(),
  dosage: z.number().positive(),
  frequency: z.number().int().positive(),
  startDate: z.string().date(),
  quantityReceived: z.number().int().positive(),
  daysSupply: z.number().int().positive(),
});
