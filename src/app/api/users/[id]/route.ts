import { NextResponse } from "next/server";
import { container } from "@/lib/container";
import { NotFoundError } from "@/shared/errors";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  console.clear();
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const user = await container.userService.findById(userId);
    console.log("user response", user);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NextResponse.json({ message: err.message }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
