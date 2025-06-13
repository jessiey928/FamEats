import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import db from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ingredients = db
      .prepare(
        `
      SELECT * FROM ingredients ORDER BY created_at DESC
    `
      )
      .all();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Get ingredients error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = db
      .prepare(
        `
      INSERT INTO ingredients (name)
      VALUES (?)
    `
      )
      .run(name);

    return NextResponse.json(
      {
        id: result.lastInsertRowid,
        name
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create ingredient error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500
    });
  }
}
