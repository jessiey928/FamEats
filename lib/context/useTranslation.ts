import { t } from "i18next";
import { ParsedDish } from "@/lib/types";

export const useTranslation = () => {
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
  return {
    getTranslatedDish
  };
};
