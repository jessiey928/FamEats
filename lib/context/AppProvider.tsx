"use client";

import React, { createContext, useEffect } from "react";
import { useAuth } from "./useAuth";
import { useDishes } from "./useDishes";
import { useComments } from "./useComments";
import { useSelections } from "./useSelections";
import { useIngredients } from "./useIngredients";
import { useTranslation } from "./useTranslation";
import { useImageUpload } from "./useImageUpload";

const AppContext = createContext<any>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const dishes = useDishes();
  const comments = useComments();
  const ingredients = useIngredients();
  const imageUpload = useImageUpload();
  const selections = useSelections();
  const translation = useTranslation();

  // 检查认证状态
  useEffect(() => {
    auth.checkAuthStatus();
  }, []);

  // 当用户登录后获取菜品
  useEffect(() => {
    if (auth.currentUser) {
      dishes.refreshDishes();
    }
  }, [auth.currentUser]);

  const logout = async () => {
    await auth.logout();
    dishes.setMenuItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        ...auth,
        ...dishes,
        ...comments,
        ...selections,
        ...ingredients,
        ...imageUpload,
        ...translation,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
