import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";
import { AuthUser, requireAuth } from "@/lib/auth";

export const POST = requireAuth(
  async (
    _request: NextRequest,
    { params }: { params: { id: string; commentId: string } },
    user: AuthUser
  ) => {
    try {
      const dishId = Number.parseInt(params.id);
      const commentId = Number.parseInt(params.commentId);

      // 检查菜品是否存在
      const dish = db.prepare("SELECT id FROM dishes WHERE id = ?").get(dishId);
      if (!dish) {
        return NextResponse.json({ error: "Dish not found" }, { status: 404 });
      }

      // 检查评论是否存在
      const comment = db
        .prepare("SELECT * FROM comments WHERE id = ? AND dish_id = ?")
        .get(commentId, dishId);
      if (!comment) {
        return NextResponse.json(
          { error: "Comment not found" },
          { status: 404 }
        );
      }

      // 检查用户是否已经点赞
      const existingLike = db
        .prepare("SELECT * FROM likes WHERE user_id = ? AND comment_id = ?")
        .get(user.id, commentId);

      if (existingLike) {
        // 如果已经点赞，则取消点赞
        db.prepare(
          "DELETE FROM likes WHERE user_id = ? AND comment_id = ?"
        ).run(user.id, commentId);
        // 更新评论的点赞数
        db.prepare("UPDATE comments SET likes = likes - 1 WHERE id = ?").run(
          commentId
        );
        return NextResponse.json({ message: "Like removed" });
      } else {
        // 如果没有点赞，则添加点赞记录
        db.prepare("INSERT INTO likes (user_id, comment_id) VALUES (?, ?)").run(
          user.id,
          commentId
        );
        // 更新评论的点赞数
        db.prepare("UPDATE comments SET likes = likes + 1 WHERE id = ?").run(
          commentId
        );
        return NextResponse.json({ message: "Like added" });
      }
    } catch (error) {
      console.error("Like comment error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
