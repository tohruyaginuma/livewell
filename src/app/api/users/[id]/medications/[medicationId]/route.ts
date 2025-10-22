import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string; medicationId: string } },
) {
  const { id, medicationId } = await params;
  const userId = parseInt(id, 10);
  const medicationIdInt = parseInt(medicationId, 10);

  if (Number.isNaN(userId) || Number.isNaN(medicationIdInt)) {
    return NextResponse.json(
      { message: "Invalid user ID or medication ID" },
      { status: 400 },
    );
  }

  console.log("get request user id is ", userId);
  console.log("get request medication id is ", medicationIdInt);

  return NextResponse.json(
    { message: "User medication retrieved" },
    { status: 200 },
  );
}

export async function PUT(
  _req: Request,
  { params }: { params: { id: string; medicationId: string } },
) {
  const { id, medicationId } = await params;
  const userId = parseInt(id, 10);
  const medicationIdInt = parseInt(medicationId, 10);
  if (Number.isNaN(userId) || Number.isNaN(medicationIdInt)) {
    return NextResponse.json(
      { message: "Invalid user ID or medication ID" },
      { status: 400 },
    );
  }

  console.log("put request user id is ", userId);
  console.log("put request medication id is ", medicationIdInt);

  return NextResponse.json(
    { message: "User medication updated" },
    { status: 200 },
  );
}
