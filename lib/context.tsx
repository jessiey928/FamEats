"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react";
import { useLanguage } from "./language-context";
import type { User, Dish, ParsedDish } from "./types";

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  menuItems: ParsedDish[];
  loading: boolean;
  refreshDishes: () => Promise<void>;
  updateMenuItem: (item: ParsedDish) => Promise<void>;
  addMenuItem: (
    item: Omit<
      ParsedDish,
      | "id"
      | "comments"
      | "selections"
      | "created_at"
      | "updated_at"
      | "created_by"
    >
  ) => Promise<void>;
  deleteMenuItem: (id: number) => Promise<void>;
  getTranslatedDish: (dish: ParsedDish) => ParsedDish;
  login: (username: string, password: string) => Promise<boolean>;
  guestLogin: (displayName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  toggleSelection: (dishId: number) => Promise<void>;
  addComment: (dishId: number, text: string) => Promise<void>;
  editComment: (
    dishId: number,
    commentId: number,
    text: string
  ) => Promise<void>;
  deleteComment: (dishId: number, commentId: number) => Promise<void>;
  toggleCommentLike: (dishId: number, commentId: number) => Promise<void>;
  uploadImage: (file: File) => Promise<string | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<ParsedDish[]>([]);
  const [loading, setLoading] = useState(true);

  // 检查认证状态
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 当用户登录后获取菜品
  useEffect(() => {
    if (currentUser) {
      refreshDishes();
    }
  }, [currentUser]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const guestLogin = async (displayName?: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_name: displayName })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Guest login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      setMenuItems([]);
    } catch (error) {
      console.error("Logout failed:", error);
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
        setMenuItems([...menuItems, newDish]);
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

  const toggleSelection = async (dishId: number) => {
    try {
      const response = await fetch(`/api/dishes/${dishId}/selections`, {
        method: "POST"
      });

      if (response.ok) {
        await refreshDishes(); // 刷新数据以获取最新的选择状态
      }
    } catch (error) {
      console.error("Failed to toggle selection:", error);
    }
  };

  const addComment = async (dishId: number, text: string) => {
    try {
      const response = await fetch(`/api/dishes/${dishId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        await refreshDishes(); // 刷新数据以获取最新的评论
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const editComment = async (
    dishId: number,
    commentId: number,
    text: string
  ) => {
    try {
      const response = await fetch(
        `/api/dishes/${dishId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        }
      );

      if (response.ok) {
        await refreshDishes(); // 刷新数据以获取最新的评论
      }
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const deleteComment = async (dishId: number, commentId: number) => {
    try {
      const response = await fetch(
        `/api/dishes/${dishId}/comments/${commentId}`,
        {
          method: "DELETE"
        }
      );
      if (response.ok) {
        await refreshDishes(); // 刷新数据以获取最新的评论
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  // toggle likes status on comments
  const toggleCommentLike = async (dishId: number, commentId: number) => {
    try {
      const response = await fetch(
        `/api/dishes/${dishId}/comments/${commentId}/like`,
        {
          method: "POST"
        }
      );
      if (response.ok) {
        await refreshDishes(); // 刷新数据以获取最新的评论状态
      }
    } catch (error) {
      console.error("Failed to toggle comment like:", error);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        return data.path;
      } else {
        console.error("Image upload failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  // 简化的翻译函数
  const getTranslatedDish = (dish: ParsedDish): ParsedDish => {
    try {
      const translatedName = t(dish.name as any) || dish.name;
      return {
        ...dish,
        name: translatedName
      };
    } catch (error) {
      console.error("Translation error:", error);
      return dish;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        menuItems,
        loading,
        refreshDishes,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        getTranslatedDish,
        login,
        guestLogin,
        logout,
        toggleSelection,
        addComment,
        editComment,
        deleteComment,
        toggleCommentLike,
        uploadImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
