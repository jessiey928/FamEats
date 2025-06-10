import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";
import { getAuthUser } from "@/lib/auth";
import { Dish } from "@/lib/types";

// 获取单个菜品
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dishId = Number.parseInt(params.id);

    const dish = db
      .prepare("SELECT * FROM dishes WHERE id = ?")
      .get(dishId) as Dish;

    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    const comments = db
      .prepare(
        `
      SELECT * FROM comments WHERE dish_id = ? ORDER BY created_at DESC
    `
      )
      .all(dishId);

    const selections = db
      .prepare(
        `
      SELECT * FROM selections WHERE dish_id = ?
    `
      )
      .all(dishId);

    return NextResponse.json({
      ...dish,
      ingredients: JSON.parse(dish.ingredients),
      comments,
      selections
    });
  } catch (error) {
    console.error("Get dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 更新菜品
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dishId = Number.parseInt(params.id);
    const body = await request.json();

    // 检查菜品是否存在
    const existingDish = db
      .prepare("SELECT * FROM dishes WHERE id = ?")
      .get(dishId);
    if (!existingDish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    // 更新菜品
    const updateFields = [];
    const updateValues = [];

    if (body.name !== undefined) {
      updateFields.push("name = ?");
      updateValues.push(body.name);
    }
    if (body.available !== undefined) {
      updateFields.push("available = ?");
      updateValues.push(body.available ? 1 : 0);
    }
    if (body.ingredients !== undefined) {
      updateFields.push("ingredients = ?");
      updateValues.push(JSON.stringify(body.ingredients));
    }

    updateFields.push("updated_at = CURRENT_TIMESTAMP");

    db.prepare(
      `
      UPDATE dishes SET ${updateFields.join(", ")} WHERE id = ?
    `
    ).run(...updateValues, dishId);

    // 返回更新后的菜品
    const updatedDish = db
      .prepare("SELECT * FROM dishes WHERE id = ?")
      .get(dishId) as Dish;
    const comments = db
      .prepare("SELECT * FROM comments WHERE dish_id = ?")
      .all(dishId);
    const selections = db
      .prepare("SELECT * FROM selections WHERE dish_id = ?")
      .all(dishId);

    return NextResponse.json({
      ...updatedDish,
      ingredients: JSON.parse(updatedDish.ingredients),
      comments,
      selections
    });
  } catch (error) {
    console.error("Update dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 删除菜品
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user || user.is_guest) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dishId = Number.parseInt(params.id);

    const result = db.prepare("DELETE FROM dishes WHERE id = ?").run(dishId);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Delete dish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
