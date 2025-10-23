import type { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { id, medicationId, takenId } = await context.params;

  const userId = Number.parseInt(id as string, 10);
  const medicationIdInt = Number.parseInt(medicationId as string, 10);
  const takenIdInt = Number.parseInt(takenId as string, 10);
  if (
    Number.isNaN(userId) ||
    Number.isNaN(medicationIdInt) ||
    Number.isNaN(takenIdInt)
  ) {
    return NextResponse.json(
      { message: "Invalid user ID or medication ID or taken ID" },
      { status: 400 },
    );
  }

  console.log("delete request user id is", userId);
  console.log("delete request taken id is", takenIdInt);

  return NextResponse.json(
    { message: "User medication deleted" },
    { status: 204 },
  );
}
