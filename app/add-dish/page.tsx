"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ArrowLeft, Plus, X, Upload, Globe, Home } from "lucide-react";
import { useApp } from "@/lib/context";
import i18n from "@/lib/i18n";

export default function AddDishPage() {
  const { t } = useTranslation();
  const { currentUser, addMenuItem, uploadImage } = useApp();
  const router = useRouter();

  const [dishData, setDishData] = useState({
    name: "",
    category: "",
    image: "/placeholder.svg?height=200&width=300",
    available: 1 as 1 | 0
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // 双语食材建议
  const ingredientSuggestions = [
    "Rice",
    "Noodles",
    "Chicken",
    "Pork",
    "Beef",
    "Fish",
    "Shrimp",
    "Tofu",
    "Eggs",
    "Onion",
    "Garlic",
    "Ginger",
    "Scallions",
    "Soy sauce",
    "Oyster sauce",
    "Sesame oil",
    "Vegetable oil",
    "Salt",
    "Sugar",
    "Vinegar",
    "Tomatoes",
    "Potatoes",
    "Carrots",
    "Bell peppers",
    "Broccoli",
    "米饭",
    "面条",
    "鸡肉",
    "猪肉",
    "牛肉",
    "鱼",
    "虾",
    "豆腐",
    "鸡蛋",
    "洋葱",
    "蒜",
    "生姜",
    "葱",
    "生抽",
    "蚝油",
    "香油",
    "植物油",
    "盐",
    "糖",
    "醋",
    "西红柿",
    "土豆",
    "胡萝卜",
    "青椒",
    "西兰花"
  ];

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700">Loading...</p>
        </div>
      </div>
    );
  }

  const handleIngredientChange = (value: string) => {
    setNewIngredient(value);
    if (value.trim()) {
      const filtered = ingredientSuggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase()) &&
          !ingredients.includes(suggestion)
      );
      setFilteredSuggestions(filtered.slice(0, 8));
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const addIngredient = (ingredient?: string) => {
    const ingredientToAdd = ingredient || newIngredient.trim();
    if (ingredientToAdd && !ingredients.includes(ingredientToAdd)) {
      setIngredients([...ingredients, ingredientToAdd]);
      setNewIngredient("");
      setShowSuggestions(false);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleSave = () => {
    if (dishData.name && dishData.category && ingredients.length > 0) {
      addMenuItem({
        ...dishData,
        ingredients
      });
      router.push("/menu");
    }
  };

  const handleUploadImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setDishData({ ...dishData, image: imageUrl });
        } else {
          console.error("Image upload failed");
        }
      }
    };
    input.click();
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLanguage);
  };

  const isFormValid =
    dishData.name && dishData.category && ingredients.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/menu")}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToMenu")}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <Home className="h-4 w-4 mr-2" />
              首页
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t("addNewDish")}
              </h1>
              <p className="text-orange-700">{t("shareRecipe")}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Globe className="h-4 w-4 mr-2" />
            {i18n.language === "en" ? "中文" : "English"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">
                  {t("basicInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-orange-800 font-medium">
                    {t("dishName")}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t("dishNamePlaceholder")}
                    value={dishData.name}
                    onChange={(e) =>
                      setDishData({ ...dishData, name: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="category"
                    className="text-orange-800 font-medium"
                  >
                    {t("category2")}
                  </Label>
                  <Select
                    value={dishData.category}
                    onValueChange={(value) =>
                      setDishData({ ...dishData, category: value })
                    }
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder={t("selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staple">{t("staple")}</SelectItem>
                      <SelectItem value="meat">{t("meat")}</SelectItem>
                      <SelectItem value="vegetable">
                        {t("vegetable")}
                      </SelectItem>
                      <SelectItem value="drink">{t("drink")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">
                  {t("ingredients")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder={t("addIngredient")}
                        value={newIngredient}
                        onChange={(e) => handleIngredientChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                        onFocus={() =>
                          newIngredient.trim() &&
                          setShowSuggestions(filteredSuggestions.length > 0)
                        }
                        onBlur={() =>
                          setTimeout(() => setShowSuggestions(false), 200)
                        }
                        className="border-orange-200 focus:border-orange-400"
                      />
                      {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-orange-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {filteredSuggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left px-3 py-2 hover:bg-orange-50 text-sm border-b border-orange-100 last:border-b-0"
                              onClick={() => addIngredient(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => addIngredient()}
                      className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {ingredients.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-orange-800 font-medium">
                      {t("addedIngredients")}
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-amber-50 border-amber-200 text-amber-800 pr-1"
                        >
                          {ingredient}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-2 hover:bg-red-100"
                            onClick={() => removeIngredient(ingredient)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">
                  {t("dishPhoto")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center bg-orange-50">
                  <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <p className="text-orange-700 mb-2">{t("uploadPhoto")}</p>
                  <p className="text-sm text-orange-600">{t("browseOrDrag")}</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-orange-300 text-orange-700 hover:bg-orange-100"
                    onClick={handleUploadImage}
                  >
                    {t("choosePhoto")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">
                  {t("preview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border border-orange-200 rounded-lg overflow-hidden">
                  <img
                    src={dishData.image || "/placeholder.svg"}
                    alt="Dish preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-orange-900">
                      {dishData.name || t("dishNamePreview")}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      {dishData.category && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 border-amber-200 text-amber-800"
                        >
                          {dishData.category}
                        </Badge>
                      )}
                    </div>
                    {Array.isArray(ingredients) && ingredients.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-orange-800 mb-1">
                          {t("ingredients")}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {ingredients.slice(0, 3).map((ingredient, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-blue-50 border-blue-200 text-blue-800 text-xs"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                          {ingredients.length > 3 && (
                            <Badge
                              variant="outline"
                              className="bg-gray-50 border-gray-200 text-gray-600 text-xs"
                            >
                              +{ingredients.length - 3} {t("more")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 text-lg shadow-lg disabled:opacity-50"
            >
              {t("addToMenu")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
