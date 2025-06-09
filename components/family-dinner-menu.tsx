"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageSquare, Plus, ChefHat, Check, Eye, LogOut, Globe, X } from "lucide-react"
import DishDetails from "./dish-details"
import LoginPage from "./login-page"
import AddDishPage from "./add-dish-page"

type Language = "en" | "zh"

interface User {
  username: string
  isGuest: boolean
  displayName?: string
}

export default function FamilyDinnerMenu() {
  // Language and translations
  const [language, setLanguage] = useState<Language>("en")

  const translations = {
    en: {
      title: "🍜 Family Kitchen 🥢",
      subtitle: "Delicious Chinese dishes made with love",
      welcome: "Welcome back",
      whatToCook: "What delicious dishes shall we cook tonight?",
      familyKitchen: "Family Kitchen",
      logout: "Logout",
      allDishes: "🍽️ All Dishes",
      staple: "🍚 Staple",
      meat: "🥩 Meat",
      vegetable: "🥬 Vegetable",
      drink: "🍵 Drink",
      available: "✅ Available",
      notAvailable: "❌ Not Available",
      selected: "Selected",
      select: "Select",
      viewDetails: "View Details",
      ingredients: "Ingredients",
      more: "more",
      availableForDinner: "Available for dinner?",
      tonightSelections: "Tonight's Dinner Selections 🍽️",
      selected2: "selected:",
      noSelections: "No selections yet",
      addNewDish: "Add New Delicious Dish 🍳",
      language: "Language",
      deleteDish: "Delete Dish",
    },
    zh: {
      title: "🍜 家庭厨房 🥢",
      subtitle: "用爱制作的美味中式菜肴",
      welcome: "欢迎回来",
      whatToCook: "今晚我们要做什么美味的菜呢？",
      familyKitchen: "家庭厨房",
      logout: "退出登录",
      allDishes: "🍽️ 所有菜品",
      staple: "🍚 主食",
      meat: "🥩 荤菜",
      vegetable: "🥬 素菜",
      drink: "🍵 饮品",
      available: "✅ 可制作",
      notAvailable: "❌ 不可制作",
      selected: "已选择",
      select: "选择",
      viewDetails: "查看详情",
      ingredients: "食材",
      more: "更多",
      availableForDinner: "今晚可以制作？",
      tonightSelections: "今晚的晚餐选择 🍽️",
      selected2: "选择了：",
      noSelections: "还没有选择",
      addNewDish: "添加新的美味菜品 🍳",
      language: "语言",
      deleteDish: "删除菜品",
    },
  }

  const t = translations[language]

  // Sample menu items with Chinese names
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: language === "en" ? "Yangzhou Fried Rice" : "扬州炒饭",
      image: "/placeholder.svg?height=200&width=300",
      category: "staple",
      ingredients:
        language === "en"
          ? ["Rice", "Eggs", "Shrimp", "Ham", "Green peas", "Scallions", "Soy sauce"]
          : ["米饭", "鸡蛋", "虾仁", "火腿", "青豆", "葱花", "生抽"],
      available: true,
      comments: [
        {
          member: "Girlfriend",
          text:
            language === "en"
              ? "Love the shrimp in this! Can we add more next time?"
              : "喜欢里面的虾仁！下次可以多放一些吗？",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 2,
      name: language === "en" ? "Steamed White Rice" : "白米饭",
      image: "/placeholder.svg?height=200&width=300",
      category: "staple",
      ingredients: language === "en" ? ["Jasmine rice", "Water"] : ["香米", "水"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 3,
      name: language === "en" ? "Hand-pulled Noodles" : "手擀面",
      image: "/placeholder.svg?height=200&width=300",
      category: "staple",
      ingredients:
        language === "en" ? ["Wheat flour", "Water", "Salt", "Alkaline water"] : ["面粉", "水", "盐", "碱水"],
      available: false,
      comments: [
        {
          member: "You",
          text: language === "en" ? "Takes too long to make on weekdays" : "工作日做这个太费时间了",
          likes: 0,
        },
      ],
      selections: [],
    },
    {
      id: 4,
      name: language === "en" ? "Sweet and Sour Pork" : "糖醋里脊",
      image: "/placeholder.svg?height=200&width=300",
      category: "meat",
      ingredients:
        language === "en"
          ? ["Pork tenderloin", "Pineapple", "Bell peppers", "Onion", "Vinegar", "Sugar", "Ketchup"]
          : ["猪里脊", "菠萝", "青椒", "洋葱", "醋", "糖", "番茄酱"],
      available: true,
      comments: [
        {
          member: "Girlfriend",
          text:
            language === "en"
              ? "My absolute favorite! Perfect balance of sweet and sour"
              : "我的最爱！酸甜口感完美平衡",
          likes: 2,
        },
      ],
      selections: [],
    },
    {
      id: 5,
      name: language === "en" ? "Kung Pao Chicken" : "宫保鸡丁",
      image: "/placeholder.svg?height=200&width=300",
      category: "meat",
      ingredients:
        language === "en"
          ? ["Chicken breast", "Peanuts", "Dried chilies", "Sichuan peppercorns", "Scallions", "Garlic"]
          : ["鸡胸肉", "花生米", "干辣椒", "花椒", "葱段", "蒜"],
      available: true,
      comments: [
        {
          member: "You",
          text: language === "en" ? "Love the numbing spice from Sichuan peppercorns!" : "喜欢花椒的麻味！",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 6,
      name: language === "en" ? "Braised Pork Belly" : "红烧肉",
      image: "/placeholder.svg?height=200&width=300",
      category: "meat",
      ingredients:
        language === "en"
          ? ["Pork belly", "Soy sauce", "Rock sugar", "Shaoxing wine", "Star anise", "Ginger"]
          : ["五花肉", "生抽", "冰糖", "黄酒", "八角", "生姜"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 7,
      name: language === "en" ? "Mapo Tofu" : "麻婆豆腐",
      image: "/placeholder.svg?height=200&width=300",
      category: "vegetable",
      ingredients:
        language === "en"
          ? ["Silken tofu", "Ground pork", "Doubanjiang", "Sichuan peppercorns", "Scallions", "Garlic"]
          : ["嫩豆腐", "肉末", "豆瓣酱", "花椒", "葱花", "蒜"],
      available: true,
      comments: [
        {
          member: "Girlfriend",
          text: language === "en" ? "So comforting and flavorful!" : "很温暖很有味道！",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 8,
      name: language === "en" ? "Stir-fried Bok Choy" : "清炒小白菜",
      image: "/placeholder.svg?height=200&width=300",
      category: "vegetable",
      ingredients:
        language === "en"
          ? ["Baby bok choy", "Garlic", "Ginger", "Oyster sauce", "Sesame oil"]
          : ["小白菜", "蒜", "生姜", "蚝油", "香油"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 9,
      name: language === "en" ? "Dry-fried Green Beans" : "干煸四季豆",
      image: "/placeholder.svg?height=200&width=300",
      category: "vegetable",
      ingredients:
        language === "en"
          ? ["Green beans", "Preserved vegetables", "Ground pork", "Dried chilies", "Garlic"]
          : ["四季豆", "榨菜", "肉末", "干辣椒", "蒜"],
      available: true,
      comments: [
        {
          member: "You",
          text:
            language === "en"
              ? "Great texture when done right - crispy outside, tender inside"
              : "做得好的话口感很棒 - 外脆内嫩",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 10,
      name: language === "en" ? "Jasmine Tea" : "茉莉花茶",
      image: "/placeholder.svg?height=200&width=300",
      category: "drink",
      ingredients: language === "en" ? ["Jasmine tea leaves", "Hot water"] : ["茉莉花茶叶", "热水"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 11,
      name: language === "en" ? "Soy Milk" : "豆浆",
      image: "/placeholder.svg?height=200&width=300",
      category: "drink",
      ingredients: language === "en" ? ["Soybeans", "Water", "Sugar (optional)"] : ["黄豆", "水", "糖（可选）"],
      available: true,
      comments: [
        { member: "Girlfriend", text: language === "en" ? "Perfect with breakfast!" : "配早餐很棒！", likes: 1 },
      ],
      selections: [],
    },
  ])

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedDishId, setSelectedDishId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<"menu" | "login" | "add-dish">("login")

  // Toggle dish availability
  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  const toggleSelection = (id: number) => {
    if (!currentUser) return

    const userDisplayName = currentUser.displayName || currentUser.username

    setMenuItems(
      menuItems.map((item) => {
        if (item.id === id) {
          const hasSelected = item.selections.includes(userDisplayName)
          return {
            ...item,
            selections: hasSelected
              ? item.selections.filter((selector) => selector !== userDisplayName)
              : [...item.selections, userDisplayName],
          }
        }
        return item
      }),
    )
  }

  const updateMenuItem = (updatedItem: any) => {
    setMenuItems(menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const addNewDish = (newDish: any) => {
    const dishWithId = {
      ...newDish,
      id: Math.max(...menuItems.map((item) => item.id)) + 1,
      comments: [],
      selections: [],
    }
    setMenuItems([...menuItems, dishWithId])
    setCurrentPage("menu")
  }

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    setCurrentPage("menu")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentPage("login")
    setSelectedDishId(null)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  // Show login page if not logged in
  if (currentPage === "login" || !currentUser) {
    return <LoginPage onLogin={handleLogin} language={language} onLanguageToggle={toggleLanguage} />
  }

  // Show add dish page
  if (currentPage === "add-dish") {
    return (
      <AddDishPage
        onSave={addNewDish}
        onCancel={() => setCurrentPage("menu")}
        language={language}
        onLanguageToggle={toggleLanguage}
      />
    )
  }

  // If a dish is selected, show the details page
  if (selectedDishId) {
    const selectedDish = menuItems.find((item) => item.id === selectedDishId)
    if (selectedDish) {
      return (
        <DishDetails
          dish={selectedDish}
          currentUser={currentUser.displayName || currentUser.username}
          onBack={() => setSelectedDishId(null)}
          onUpdate={updateMenuItem}
          language={language}
          onLanguageToggle={toggleLanguage}
          isAdmin={!currentUser.isGuest}
        />
      )
    }
  }

  const userDisplayName = currentUser.displayName || currentUser.username

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            {t.title}
          </h1>
          <p className="text-xl text-amber-700 font-medium">{t.subtitle}</p>
        </div>

        {/* User Info Header */}
        <Card className="mb-6 border-orange-200 shadow-lg bg-gradient-to-r from-orange-100 to-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-orange-300">
                  <AvatarImage src="/placeholder.svg" alt={userDisplayName} />
                  <AvatarFallback className="bg-orange-200 text-orange-800">{userDisplayName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-orange-900">
                    {t.welcome}, {userDisplayName}! 👋
                    {currentUser.isGuest && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 border-blue-200 text-blue-700">
                        {language === "en" ? "Guest" : "访客"}
                      </Badge>
                    )}
                  </p>
                  <p className="text-orange-700">{t.whatToCook}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "中文" : "English"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.logout}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-6 bg-gradient-to-r from-orange-200 to-amber-200 border-orange-300">
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t.allDishes}
            </TabsTrigger>
            <TabsTrigger value="staple" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t.staple}
            </TabsTrigger>
            <TabsTrigger value="meat" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t.meat}
            </TabsTrigger>
            <TabsTrigger value="vegetable" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t.vegetable}
            </TabsTrigger>
            <TabsTrigger value="drink" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t.drink}
            </TabsTrigger>
          </TabsList>

          {["all", "staple", "meat", "vegetable", "drink"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems
                  .filter((item) => category === "all" || item.category === category)
                  .map((item) => (
                    <Card
                      key={item.id}
                      className={`overflow-hidden border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 ${!item.available ? "opacity-60" : "hover:scale-105"}`}
                    >
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        {item.available ? (
                          <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 shadow-lg">
                            {t.available}
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="absolute top-3 right-3 shadow-lg">
                            {t.notAvailable}
                          </Badge>
                        )}
                        {/* Select button in top-left corner */}
                        <div className="absolute top-3 left-3">
                          <Button
                            size="sm"
                            className={`shadow-lg font-medium ${
                              item.selections.includes(userDisplayName)
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                                : "bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white border-0"
                            }`}
                            onClick={() => toggleSelection(item.id)}
                            disabled={!item.available}
                          >
                            {item.selections.includes(userDisplayName) ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                {t.selected}
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-1" />
                                {t.select}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-orange-900">{item.name}</span>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="bg-white">
                        <div className="mb-4">
                          <h3 className="text-sm font-medium mb-2 text-orange-800">{t.ingredients}:</h3>
                          <div className="flex flex-wrap gap-1">
                            {item.ingredients.slice(0, 4).map((ingredient, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="bg-amber-50 border-amber-200 text-amber-800"
                              >
                                {ingredient}
                              </Badge>
                            ))}
                            {item.ingredients.length > 4 && (
                              <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                                +{item.ingredients.length - 4} {t.more}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Admin toggle for availability */}
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`available-${item.id}`} className="text-sm font-medium text-orange-800">
                            {t.availableForDinner}
                          </Label>
                          <Switch
                            id={`available-${item.id}`}
                            checked={item.available}
                            onCheckedChange={() => toggleAvailability(item.id)}
                          />
                        </div>
                      </CardContent>

                      <CardFooter className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 border-orange-300 text-orange-700 hover:bg-orange-100"
                          onClick={() => setSelectedDishId(item.id)}
                        >
                          <Eye className="h-4 w-4" />
                          {t.viewDetails}
                        </Button>

                        <div className="flex items-center gap-2">
                          {item.comments.length > 0 && (
                            <div className="flex items-center gap-1 text-sm text-amber-700">
                              <MessageSquare className="h-4 w-4" />
                              <span>{item.comments.length}</span>
                            </div>
                          )}
                          {currentUser && !currentUser.isGuest && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                              onClick={() => {
                                setMenuItems(menuItems.filter((menuItem) => menuItem.id !== item.id))
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Summary of votes */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <ChefHat className="h-6 w-6" />
              {t.tonightSelections}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-orange-300">
                  <AvatarImage src="/placeholder.svg" alt={userDisplayName} />
                  <AvatarFallback className="bg-orange-200 text-orange-800">{userDisplayName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-orange-900">
                    {userDisplayName} {t.selected2}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {menuItems
                      .filter((item) => item.selections.includes(userDisplayName) && item.available)
                      .map((item) => (
                        <Badge key={item.id} className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                          {item.name}
                        </Badge>
                      ))}
                    {!menuItems.some((item) => item.selections.includes(userDisplayName) && item.available) && (
                      <span className="text-sm text-amber-600 italic">{t.noSelections}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add new dish button */}
        <div className="text-center mb-8">
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg text-lg px-8 py-3"
            onClick={() => setCurrentPage("add-dish")}
          >
            <Plus className="h-5 w-5" />
            {t.addNewDish}
          </Button>
        </div>
      </div>
    </div>
  )
}
