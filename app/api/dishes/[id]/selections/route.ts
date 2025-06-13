import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";
import { getAuthUser } from "@/lib/auth";

// 切换菜品选择
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dishId = Number(params.id);

    // 检查菜品是否存在
    const dish = db.prepare("SELECT id FROM dishes WHERE id = ?").get(dishId);
    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    const memberName = user.display_name || user.username;

    // 检查是否已经选择
    const existingSelection = db
      .prepare(
        `
      SELECT id FROM selections WHERE dish_id = ? AND user_id = ?
    `
      )
      .get(dishId, user.id);

    if (existingSelection) {
      // 取消选择
      db.prepare(
        "DELETE FROM selections WHERE dish_id = ? AND user_id = ?"
      ).run(dishId, user.id);
      return NextResponse.json({ selected: false });
    } else {
      // 添加选择
      db.prepare(
        `
        INSERT INTO selections (dish_id, user_id, member_name)
        VALUES (?, ?, ?)
      `
      ).run(dishId, user.id, memberName);
      return NextResponse.json({ selected: true });
    }
  } catch (error) {
    console.error("Toggle selection error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
