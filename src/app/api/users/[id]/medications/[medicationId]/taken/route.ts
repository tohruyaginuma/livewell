import type { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _req: NextRequest,
  context: { params: Promise<Params> },
) {
  const { id, medicationId } = await context.params;

  const userId = Number.parseInt(id as string, 10);
  const medicationIdInt = Number.parseInt(medicationId as string, 10);

  if (Number.isNaN(userId) || Number.isNaN(medicationIdInt)) {
    return NextResponse.json(
      { message: "Invalid user ID or medication ID" },
      { status: 400 },
    );
  }

  console.log("get request user id is", userId);
  console.log("get request medication id is", medicationIdInt);

  return NextResponse.json(
    { message: "User medication retrieved" },
    { status: 200 },
  );
}
