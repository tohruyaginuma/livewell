import { container } from "@/server/lib/container";
import type { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "@/shared/errors";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { "user-medication-id": userMedicationId, "taken-id": takenId } =
    await context.params;

  const userMedicationIdInt = Number.parseInt(userMedicationId as string, 10);
  const takenIdInt = Number.parseInt(takenId as string, 10);

  if (Number.isNaN(userMedicationIdInt) || Number.isNaN(takenIdInt)) {
    return NextResponse.json(
      { message: "Invalid medication ID or taken ID" },
      { status: 400 },
    );
  }

  try {
    await container.userMedicationStatusService.deleteUserMedicationStatus(
      takenIdInt,
    );

    return NextResponse.json(
      { message: "Taken dose deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Failed to delete taken dose" },
      { status: 500 },
    );
  }
}
