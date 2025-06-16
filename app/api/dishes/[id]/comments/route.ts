import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";
import { AuthUser, requireAuth } from "@/lib/auth";

// 添加评论
export const POST = requireAuth(
  async (
    request: NextRequest,
    { params }: { params: { id: string } },
    user: AuthUser
  ) => {
    try {
      const dishId = Number.parseInt(params.id);
      const body: { text: string } = await request.json();

      if (!body.text?.trim()) {
        return NextResponse.json(
          { error: "Comment text is required" },
          { status: 400 }
        );
      }

      // 检查菜品是否存在
      const dish = db.prepare("SELECT id FROM dishes WHERE id = ?").get(dishId);
      if (!dish) {
        return NextResponse.json({ error: "Dish not found" }, { status: 404 });
      }

      const memberName = user.display_name || user.username;

      const result = db
        .prepare(
          `
      INSERT INTO comments (dish_id, user_id, member_name, text)
      VALUES (?, ?, ?, ?)
    `
        )
        .run(dishId, user.id, memberName, body.text.trim());

      const newComment = db
        .prepare("SELECT * FROM comments WHERE id = ?")
        .get(result.lastInsertRowid);

      return NextResponse.json(newComment);
    } catch (error) {
      console.error("Create comment error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
