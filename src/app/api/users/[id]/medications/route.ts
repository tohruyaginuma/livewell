import { container } from "@/server/lib/container";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "@/shared/errors";
import { UserMedicationCreateSchema } from "@/app/api/users/[id]/medications/schemas";
type Params = { id: string };

export async function GET(
  _req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { id } = await context.params;
  const userId = Number.parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  try {
    const userMedications =
      await container.userMedicationService.getUserMedicationsByUserId(userId);
    return NextResponse.json(userMedications, { status: 200 });
  } catch (error) {
    console.error("Error getting user medications: ", error as Error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { id } = await context.params;
  const userId = Number.parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  const json = await req.json();
  const parsed = UserMedicationCreateSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: new ValidationError(parsed.error.message).message },
      { status: 400 },
    );
  }

  const { name, dosage, frequency, quantityReceived, daysSupply, startDate } =
    parsed.data;

  try {
    const userMedication =
      await container.userMedicationService.createUserMedication(
        userId,
        name,
        quantityReceived,
        dosage,
        frequency,
        startDate.toISOString(),
        daysSupply,
      );
    return NextResponse.json(userMedication, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
