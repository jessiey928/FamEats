"use client";

import React, { createContext, useEffect } from "react";
import { useAuth, AuthContextType } from "./useAuth";
import { useDishes, DishesContextType } from "./useDishes";
import { useComments, CommentsContextType } from "./useComments";
import { useSelections, SelectionsContextType } from "./useSelections";
import { useIngredients, IngredientsContextType } from "./useIngredients";
import { useTranslation, TranslationContextType } from "./useTranslation";
import { useImageUpload, ImageUploadContextType } from "./useImageUpload";

export type AppContextType = AuthContextType &
  DishesContextType &
  CommentsContextType &
  SelectionsContextType &
  IngredientsContextType &
  ImageUploadContextType &
  TranslationContextType;

const AppContext = createContext<AppContextType | undefined>(undefined);

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
