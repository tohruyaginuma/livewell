import { container } from "@/server/lib/container";
import { NextRequest, NextResponse } from "next/server";

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

  const body = await req.json();

  return NextResponse.json({ message: "created (stub)" }, { status: 201 });
}
