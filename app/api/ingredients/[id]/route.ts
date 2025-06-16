import { NextRequest, NextResponse } from "next/server";
import { AuthUser, requireAuth } from "@/lib/auth";
import db from "@/lib/database";

export const DELETE = requireAuth(
  async (
    _request: NextRequest,
    { params }: { params: { id: string } },
    _user: AuthUser
  ) => {
    try {
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
);
