import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { container } from "@/server/lib/container";
import { UserMedicationUpdateSchema } from "@/app/api/users/[id]/medications/[userMedicationId]/schemas";
import { ValidationError } from "@/shared/errors";

type Params = { id: string; userMedicationId: string };

export async function PUT(
  req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { id, userMedicationId: userMedicationIdParam } = await context.params;
  console.log(id, userMedicationIdParam);
  const userId = Number.parseInt(id, 10);
  const userMedicationIdInt = Number.parseInt(userMedicationIdParam, 10);

  if (Number.isNaN(userId) || Number.isNaN(userMedicationIdInt)) {
    return NextResponse.json(
      { message: "Invalid user ID or medication ID" },
      { status: 400 },
    );
  }

  const json = await req.json();
  const parsed = UserMedicationUpdateSchema.safeParse(json);
  console.log(parsed);
  if (!parsed.success) {
    return NextResponse.json(
      { message: new ValidationError(parsed.error.message).message },
      { status: 400 },
    );
  }

  const { name, dosage, frequency, quantityReceived, daysSupply, startDate } =
    parsed.data;

  console.log(name, dosage, frequency, quantityReceived, daysSupply, startDate);
  try {
    const userMedication =
      await container.userMedicationService.getUserMedicationById(
        userMedicationIdInt,
      );

    if (!userMedication) {
      return NextResponse.json(
        { message: "User medication not found" },
        { status: 404 },
      );
    }

    const userMedicationUpdateResponse =
      await container.userMedicationService.updateUserMedication(
        userMedicationIdInt,
        userId,
        userMedication.medicationId,
        name,
        quantityReceived,
        dosage,
        frequency,
        startDate.toISOString(),
        daysSupply,
      );

    return NextResponse.json(userMedicationUpdateResponse, { status: 200 });
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

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { id, userMedicationId } = await context.params;

  const userId = Number.parseInt(id, 10);
  const userMedicationIdInt = Number.parseInt(userMedicationId, 10);
  console.log(userId, userMedicationIdInt);
  if (Number.isNaN(userId) || Number.isNaN(userMedicationIdInt)) {
    return NextResponse.json(
      { message: "Invalid user ID or medication ID" },
      { status: 400 },
    );
  }

  try {
    await container.userMedicationService.deleteUserMedication(
      userMedicationIdInt,
    );

    return NextResponse.json(
      { message: "User medication deleted successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
