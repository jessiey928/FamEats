"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Globe, LogOut, Home, User, SettingsIcon } from "lucide-react"
import { useApp } from "@/lib/context"
import i18n from "@/lib/i18n"

export default function SettingsPage() {
  const { t } = useTranslation("common")
  const { currentUser, setCurrentUser } = useApp()
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

  const handleLogout = () => {
    setCurrentUser(null)
    router.push("/login")
  }

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en"
    i18n.changeLanguage(newLanguage)
  }

  const userDisplayName = currentUser.displayName || currentUser.username

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
                <SettingsIcon className="inline h-10 w-10 mr-3" />
                设置
              </h1>
              <p className="text-orange-700">个人设置和偏好</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Info */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <User className="h-5 w-5" />
                  用户信息
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-orange-300">
                  <AvatarImage src="/placeholder.svg" alt={userDisplayName} />
                  <AvatarFallback className="bg-orange-200 text-orange-800 text-2xl">
                    {userDisplayName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-orange-900 mb-2">{userDisplayName}</h3>
                <div className="flex justify-center">
                  {currentUser.isGuest ? (
                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                      {t("guest")}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                      家庭成员
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-300 text-orange-700 hover:bg-orange-50"
                  onClick={() => router.push("/menu")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  返回菜单
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-300 text-orange-700 hover:bg-orange-50"
                  onClick={() => router.push("/add-dish")}
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  添加新菜品
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-300 text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("logout")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Settings */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Globe className="h-5 w-5" />
                  语言设置
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">界面语言</Label>
                    <p className="text-sm text-orange-600 mt-1">
                      当前语言: {i18n.language === "en" ? "English" : "中文"}
                    </p>
                  </div>
                  <Button
                    onClick={toggleLanguage}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    切换到 {i18n.language === "en" ? "中文" : "English"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">通知设置</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">新菜品通知</Label>
                    <p className="text-sm text-orange-600">当有新菜品添加时通知我</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">评论通知</Label>
                    <p className="text-sm text-orange-600">当有人评论我选择的菜品时通知我</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">每日提醒</Label>
                    <p className="text-sm text-orange-600">每天提醒我选择晚餐菜品</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">显示设置</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">紧凑模式</Label>
                    <p className="text-sm text-orange-600">使用更紧凑的界面布局</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">显示食材详情</Label>
                    <p className="text-sm text-orange-600">在菜品卡片上显示完整食材列表</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-orange-800 font-medium">动画效果</Label>
                    <p className="text-sm text-orange-600">启用界面动画和过渡效果</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">关于</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    🍜 家庭厨房 🥢
                  </h3>
                  <p className="text-orange-700">用爱制作的美味中式菜肴</p>
                  <p className="text-sm text-orange-600">版本 1.0.0</p>
                  <p className="text-xs text-orange-500 mt-4">© 2024 家庭厨房. 让每一餐都充满爱与温暖。</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
