import { container } from "@/server/lib/container";
import { NextResponse } from "next/server";
import { UserMedicationCreateSchema } from "./schemas";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const userId = parseInt(id, 10);

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
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const userId = parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = UserMedicationCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid request body", errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // 実際の保存処理…
  const data = parsed.data;
  console.log("Received medication:", data);

  return NextResponse.json({ result: "OK", data }, { status: 201 });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  console.log("delete request user id is ", userId);

  return NextResponse.json(null, { status: 204 });
}
