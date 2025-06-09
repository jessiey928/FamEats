"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MessageSquare, Plus, ChefHat, Check, Eye, LogOut, Globe, X } from "lucide-react"
import { useApp } from "@/lib/context"
import { useLanguage } from "@/lib/language-context"

export default function MenuPage() {
  const { t, language, toggleLanguage } = useLanguage()
  const { currentUser, setCurrentUser, menuItems, setMenuItems, deleteMenuItem, getTranslatedDish } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login")
    }
  }, [currentUser, router])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700">Loading...</p>
        </div>
      </div>
    )
  }

  const toggleAvailability = (id: number) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  const toggleSelection = (id: number) => {
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

  const handleLogout = () => {
    setCurrentUser(null)
    router.push("/login")
  }

  const userDisplayName = currentUser.displayName || currentUser.username

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            {t("title")}
          </h1>
          <p className="text-xl text-amber-700 font-medium">{t("subtitle")}</p>
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
                    {t("welcome")}, {userDisplayName}! 👋
                    {currentUser.isGuest && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 border-blue-200 text-blue-700">
                        {t("guest")}
                      </Badge>
                    )}
                  </p>
                  <p className="text-orange-700">{t("whatToCook")}</p>
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
                  {t("logout")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-6 bg-gradient-to-r from-orange-200 to-amber-200 border-orange-300">
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t("allDishes")}
            </TabsTrigger>
            <TabsTrigger value="staple" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t("staple")}
            </TabsTrigger>
            <TabsTrigger value="meat" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t("meat")}
            </TabsTrigger>
            <TabsTrigger value="vegetable" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t("vegetable")}
            </TabsTrigger>
            <TabsTrigger value="drink" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              {t("drink")}
            </TabsTrigger>
          </TabsList>

          {["all", "staple", "meat", "vegetable", "drink"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems
                  .filter((item) => category === "all" || item.category === category)
                  .map((item) => {
                    const translatedItem = getTranslatedDish(item)
                    return (
                      <Card
                        key={item.id}
                        className={`overflow-hidden border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 ${!item.available ? "opacity-60" : "hover:scale-105"}`}
                      >
                        <div className="relative">
                          <img
                            src={translatedItem.image || "/placeholder.svg"}
                            alt={translatedItem.name}
                            className="w-full h-48 object-cover"
                          />
                          {translatedItem.available ? (
                            <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 shadow-lg">
                              {t("available")}
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="absolute top-3 right-3 shadow-lg">
                              {t("notAvailable")}
                            </Badge>
                          )}
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
                                  {t("selected")}
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-1" />
                                  {t("select")}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                          <CardTitle className="flex justify-between items-center">
                            <span className="text-orange-900">{translatedItem.name}</span>
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="bg-white">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2 text-orange-800">{t("ingredients")}:</h3>
                            <div className="flex flex-wrap gap-1">
                              {translatedItem.ingredients.slice(0, 4).map((ingredient, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="bg-amber-50 border-amber-200 text-amber-800"
                                >
                                  {ingredient}
                                </Badge>
                              ))}
                              {translatedItem.ingredients.length > 4 && (
                                <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700">
                                  +{translatedItem.ingredients.length - 4} {t("more")}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor={`available-${item.id}`} className="text-sm font-medium text-orange-800">
                              {t("availableForDinner")}
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
                            onClick={() => router.push(`/dish/${item.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                            {t("viewDetails")}
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
                                onClick={() => deleteMenuItem(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    )
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Summary of votes */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <ChefHat className="h-6 w-6" />
              {t("tonightSelections")}
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
                    {userDisplayName} {t("selected2")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {menuItems
                      .filter((item) => item.selections.includes(userDisplayName) && item.available)
                      .map((item) => {
                        const translatedItem = getTranslatedDish(item)
                        return (
                          <Badge key={item.id} className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                            {translatedItem.name}
                          </Badge>
                        )
                      })}
                    {!menuItems.some((item) => item.selections.includes(userDisplayName) && item.available) && (
                      <span className="text-sm text-amber-600 italic">{t("noSelections")}</span>
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
            onClick={() => router.push("/add-dish")}
          >
            <Plus className="h-5 w-5" />
            {t("addNewDish")}
          </Button>
        </div>
      </div>
    </div>
  )
}
