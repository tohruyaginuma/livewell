import { container } from "@/server/lib/container";
import { NextResponse } from "next/server";

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
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }

  console.log("post request user id is ", userId);

  return NextResponse.json(
    { message: "User medication created" },
    { status: 200 },
  );
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
