import { useState } from "react";
import type { ParsedDish } from "../types";

export const useDishes = () => {
  const [menuItems, setMenuItems] = useState<ParsedDish[]>([]);

  const refreshDishes = async () => {
    try {
      const response = await fetch("/api/dishes");
      if (response.ok) {
        const dishes = await response.json();
        setMenuItems(dishes);
      }
    } catch (error) {
      console.error("Failed to fetch dishes:", error);
    }
  };

  const updateMenuItem = async (item: ParsedDish) => {
    try {
      const response = await fetch(`/api/dishes/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        const updatedDish = await response.json();
        setMenuItems(
          menuItems.map((dish) => (dish.id === item.id ? updatedDish : dish))
        );
      }
    } catch (error) {
      console.error("Failed to update dish:", error);
    }
  };

  const addMenuItem = async (
    item: Omit<
      ParsedDish,
      | "id"
      | "comments"
      | "selections"
      | "created_at"
      | "updated_at"
      | "created_by"
    >
  ) => {
    try {
      const response = await fetch("/api/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        const newDish = await response.json();
        setMenuItems([newDish, ...menuItems]);
      }
    } catch (error) {
      console.error("Failed to add dish:", error);
    }
  };

  const deleteMenuItem = async (id: number) => {
    try {
      const response = await fetch(`/api/dishes/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setMenuItems(menuItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete dish:", error);
    }
  };

  return {
    menuItems,
    setMenuItems,
    refreshDishes,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem
  };
};

export type DishesContextType = ReturnType<typeof useDishes>;
