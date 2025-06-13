import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import db from "@/lib/database";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = db
      .prepare(
        `
        DELETE FROM ingredients WHERE id = ?
      `
      )
      .run(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error("Delete ingredient error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500
    });
  }
}
