import { container } from "@/server/lib/container";
import type { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";
import { UserMedicationStatusCreateSchema } from "@/app/api/user-medications/[user-medication-id]/taken/schemas";
import { ValidationError } from "@/shared/errors";

export async function POST(
  req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { "user-medication-id": userMedicationIdParam } = await context.params;

  const userMedicationIdInt = Number.parseInt(
    userMedicationIdParam as string,
    10,
  );

  if (Number.isNaN(userMedicationIdInt)) {
    return NextResponse.json(
      { message: "Invalid medication ID" },
      { status: 400 },
    );
  }

  const json = await req.json();
  const parsed = UserMedicationStatusCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: new ValidationError(parsed.error.message).message },
      { status: 400 },
    );
  }

  const { takenDate } = parsed.data;

  try {
    const userMedicationStatus =
      await container.userMedicationStatusService.createUserMedicationStatus(
        userMedicationIdInt,
        takenDate,
      );

    return NextResponse.json(
      { id: userMedicationStatus.id, takenDate: takenDate.toISOString() },
      { status: 201 },
    );
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
