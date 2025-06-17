import { type NextRequest, NextResponse } from "next/server";
import db from "@/lib/database";
import { AuthUser, requireAuth } from "@/lib/auth";
import type { CreateDishRequest, Dish } from "@/lib/types";

// 获取所有菜品
export const GET = requireAuth(
  async (_request: NextRequest, _context: any, _user: AuthUser) => {
    try {
      const dishes = db
        .prepare(
          `
      SELECT * FROM dishes ORDER BY created_at DESC
    `
        )
        .all();

      // 为每个菜品获取评论和选择
      const dishesWithDetails = dishes.map((dish: any) => {
        const comments = db
          .prepare(
            `
        SELECT * FROM comments WHERE dish_id = ? ORDER BY created_at DESC
      `
          )
          .all(dish.id);

        return {
          ...dish,
          ingredients: JSON.parse(dish.ingredients),
          comments
        };
      });

      return NextResponse.json(dishesWithDetails);
    } catch (error) {
      console.error("Get dishes error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);

// 创建新菜品
export const POST = requireAuth(
  async (request: NextRequest, _context: any, user: AuthUser) => {
    try {
      const body: CreateDishRequest = await request.json();
      const { name, image, category, ingredients, available = true } = body;

      if (!name || !category || !ingredients || ingredients.length === 0) {
        return NextResponse.json(
          { error: "Name, category, and ingredients are required" },
          { status: 400 }
        );
      }

      const result = db
        .prepare(
          `
      INSERT INTO dishes (name, image, category, ingredients, available, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `
        )
        .run(
          name,
          image || "/placeholder.svg?height=200&width=300",
          category,
          JSON.stringify(ingredients),
          available ? 1 : 0,
          user.id
        );

      const newDish = db
        .prepare("SELECT * FROM dishes WHERE id = ?")
        .get(result.lastInsertRowid) as Dish;

      return NextResponse.json({
        ...newDish,
        ingredients: JSON.parse(newDish.ingredients),
        comments: [],
        selections: []
      });
    } catch (error) {
      console.error("Create dish error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
