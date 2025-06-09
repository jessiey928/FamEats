"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, Upload, Globe } from "lucide-react"

interface AddDishPageProps {
  onSave: (dish: any) => void
  onCancel: () => void
  language: "en" | "zh"
  onLanguageToggle: () => void
}

export default function AddDishPage({ onSave, onCancel, language, onLanguageToggle }: AddDishPageProps) {
  const translations = {
    en: {
      backToMenu: "Back to Menu",
      addNewDish: "Add New Dish 🍳",
      shareRecipe: "Share a delicious recipe with the family!",
      basicInfo: "Basic Information",
      dishName: "Dish Name *",
      dishNamePlaceholder: "e.g., Grandma's Dumplings",
      category: "Category *",
      selectCategory: "Select a category",
      staple: "🍚 Staple",
      meat: "🥩 Meat",
      vegetable: "🥬 Vegetable",
      drink: "🍵 Drink",
      ingredients: "Ingredients",
      addIngredient: "Add an ingredient...",
      addedIngredients: "Added Ingredients:",
      dishPhoto: "Dish Photo",
      uploadPhoto: "Upload a delicious photo of your dish",
      browseOrDrag: "Click to browse or drag and drop",
      choosePhoto: "Choose Photo",
      preview: "Preview",
      dishNamePreview: "Dish Name",
      addToMenu: "🍽️ Add to Family Menu",
    },
    zh: {
      backToMenu: "返回菜单",
      addNewDish: "添加新菜品 🍳",
      shareRecipe: "与家人分享美味食谱！",
      basicInfo: "基本信息",
      dishName: "菜品名称 *",
      dishNamePlaceholder: "例如：奶奶的饺子",
      category: "分类 *",
      selectCategory: "选择分类",
      staple: "🍚 主食",
      meat: "🥩 荤菜",
      vegetable: "🥬 素菜",
      drink: "🍵 饮品",
      ingredients: "食材",
      addIngredient: "添加食材...",
      addedIngredients: "已添加的食材：",
      dishPhoto: "菜品照片",
      uploadPhoto: "上传您菜品的美味照片",
      browseOrDrag: "点击浏览或拖拽上传",
      choosePhoto: "选择照片",
      preview: "预览",
      dishNamePreview: "菜品名称",
      addToMenu: "🍽️ 添加到家庭菜单",
    },
  }

  const t = translations[language]

  // Bilingual ingredient suggestions
  const ingredientSuggestions = {
    en: [
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
      "Bok choy",
      "Spinach",
      "Mushrooms",
      "Peanuts",
      "Cashews",
      "Chili peppers",
      "Black pepper",
      "White pepper",
      "Star anise",
      "Cinnamon",
      "Flour",
      "Cornstarch",
      "Baking powder",
      "Milk",
      "Butter",
      "Cheese",
      "Yogurt",
      "Honey",
      "Lemon",
    ],
    zh: [
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
      "西兰花",
      "小白菜",
      "菠菜",
      "蘑菇",
      "花生",
      "腰果",
      "辣椒",
      "黑胡椒",
      "白胡椒",
      "八角",
      "桂皮",
      "面粉",
      "淀粉",
      "泡打粉",
      "牛奶",
      "黄油",
      "奶酪",
      "酸奶",
      "蜂蜜",
      "柠檬",
    ],
  }

  const [dishData, setDishData] = useState({
    name: "",
    category: "",
    image: "/placeholder.svg?height=200&width=300",
    available: true,
  })
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const handleIngredientChange = (value: string) => {
    setNewIngredient(value)
    if (value.trim()) {
      const allSuggestions = [...ingredientSuggestions.en, ...ingredientSuggestions.zh]
      const filtered = allSuggestions.filter(
        (suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()) && !ingredients.includes(suggestion),
      )
      setFilteredSuggestions(filtered.slice(0, 8)) // Show max 8 suggestions
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const addIngredient = (ingredient?: string) => {
    const ingredientToAdd = ingredient || newIngredient.trim()
    if (ingredientToAdd && !ingredients.includes(ingredientToAdd)) {
      setIngredients([...ingredients, ingredientToAdd])
      setNewIngredient("")
      setShowSuggestions(false)
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleSave = () => {
    if (dishData.name && dishData.category && ingredients.length > 0) {
      onSave({
        ...dishData,
        ingredients,
      })
    }
  }

  const isFormValid = dishData.name && dishData.category && ingredients.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToMenu}
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t.addNewDish}
              </h1>
              <p className="text-orange-700">{t.shareRecipe}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLanguageToggle}
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "中文" : "English"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.basicInfo}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-orange-800 font-medium">
                    {t.dishName}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t.dishNamePlaceholder}
                    value={dishData.name}
                    onChange={(e) => setDishData({ ...dishData, name: e.target.value })}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-orange-800 font-medium">
                    {t.category}
                  </Label>
                  <Select
                    value={dishData.category}
                    onValueChange={(value) => setDishData({ ...dishData, category: value })}
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder={t.selectCategory} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staple">{t.staple}</SelectItem>
                      <SelectItem value="meat">{t.meat}</SelectItem>
                      <SelectItem value="vegetable">{t.vegetable}</SelectItem>
                      <SelectItem value="drink">{t.drink}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.ingredients}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder={t.addIngredient}
                        value={newIngredient}
                        onChange={(e) => handleIngredientChange(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                        onFocus={() => newIngredient.trim() && setShowSuggestions(filteredSuggestions.length > 0)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
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
                    <Label className="text-orange-800 font-medium">{t.addedIngredients}</Label>
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="outline" className="bg-amber-50 border-amber-200 text-amber-800 pr-1">
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
                <CardTitle className="text-orange-900">{t.dishPhoto}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center bg-orange-50">
                  <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <p className="text-orange-700 mb-2">{t.uploadPhoto}</p>
                  <p className="text-sm text-orange-600">{t.browseOrDrag}</p>
                  <Button variant="outline" className="mt-4 border-orange-300 text-orange-700 hover:bg-orange-100">
                    {t.choosePhoto}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.preview}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border border-orange-200 rounded-lg overflow-hidden">
                  <img
                    src={dishData.image || "/placeholder.svg"}
                    alt="Dish preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-orange-900">{dishData.name || t.dishNamePreview}</h3>
                    <div className="flex items-center gap-2 text-sm text-amber-700">
                      {dishData.category && (
                        <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">
                          {dishData.category}
                        </Badge>
                      )}
                    </div>
                    {ingredients.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-orange-800 mb-1">{t.ingredients}:</p>
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
                            <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-600 text-xs">
                              +{ingredients.length - 3} {language === "en" ? "more" : "更多"}
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
              {t.addToMenu}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
