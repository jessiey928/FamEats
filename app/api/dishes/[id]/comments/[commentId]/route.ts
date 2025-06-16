import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";
import { AuthUser, requireAuth } from "@/lib/auth";

export const PUT = requireAuth(
  async (
    request: NextRequest,
    { params }: { params: { id: string; commentId: string } },
    _user: AuthUser
  ) => {
    try {
      const dishId = Number(params.id);
      const commentId = Number.parseInt(params.commentId);
      const body: { text: string } = await request.json();

      if (!body.text || body.text.trim() === "") {
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

      // 更新评论
      const result = db
        .prepare(
          `
      UPDATE comments SET text = ? WHERE dish_id = ? AND id = ?
    `
        )
        .run(body.text.trim(), dishId, commentId);

      if (result.changes === 0) {
        return NextResponse.json(
          { error: "Comment not found or not authorized to update" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Comment updated successfully" });
    } catch (error) {
      console.error("Update comment error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = requireAuth(
  async (
    _request: NextRequest,
    { params }: { params: { id: string; commentId: string } },
    _user: AuthUser
  ) => {
    try {
      const dishId = Number.parseInt(params.id);
      const commentId = Number.parseInt(params.commentId);
      // 检查菜品是否存在
      const dish = db.prepare("SELECT id FROM dishes WHERE id = ?").get(dishId);
      if (!dish) {
        return NextResponse.json({ error: "Dish not found" }, { status: 404 });
      }

      // 删除评论
      const result = db
        .prepare(
          `
      DELETE FROM comments WHERE dish_id = ? AND id = ?
    `
        )
        .run(dishId, commentId);

      if (result.changes === 0) {
        return NextResponse.json(
          { error: "Comment not found or not authorized to delete" },
          { status: 404 }
        );
      }

      return NextResponse.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Delete comment error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
