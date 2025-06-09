"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Globe, UserPlus, Users } from "lucide-react"
import { useApp } from "@/lib/context"
import { useLanguage } from "@/lib/language-context"

export default function LoginPage() {
  const { t, language, toggleLanguage } = useLanguage()
  const { currentUser, setCurrentUser } = useApp()
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [guestName, setGuestName] = useState("")
  const [loginError, setLoginError] = useState("")

  // 如果用户已登录，重定向到菜单页面
  useEffect(() => {
    if (currentUser) {
      router.replace("/menu")
    }
  }, [currentUser, router])

  // 简单的硬编码凭据用于演示
  const validCredentials = [
    { username: "admin", password: "123456" },
    { username: "you", password: "password" },
    { username: "girlfriend", password: "password" },
  ]

  const handleFamilyLogin = () => {
    setLoginError("")

    if (!username.trim()) {
      setLoginError(t("usernameRequired"))
      return
    }

    if (!password.trim()) {
      setLoginError(t("passwordRequired"))
      return
    }

    const isValid = validCredentials.some((cred) => cred.username === username && cred.password === password)

    if (isValid) {
      setCurrentUser({
        username: username,
        isGuest: false,
      })
      router.push("/menu")
    } else {
      setLoginError(t("invalidCredentials"))
    }
  }

  const handleGuestLogin = () => {
    const displayName = guestName.trim() || t("guest")
    setCurrentUser({
      username: `guest_${Date.now()}`,
      isGuest: true,
      displayName: displayName,
    })
    router.push("/menu")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-orange-200 shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-orange-200 to-amber-200">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full">
              <ChefHat className="h-12 w-12 text-white" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "中文" : "English"}
            </Button>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t("title")}
          </CardTitle>
          <p className="text-orange-700 font-medium">{t("subtitle")}</p>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <Tabs defaultValue="guest" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-orange-100">
              <TabsTrigger value="guest" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                {t("guestLogin")}
              </TabsTrigger>
              <TabsTrigger value="family" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-2" />
                {t("familyLogin")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="family" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-orange-800 font-medium">
                    {t("username")}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                    onKeyPress={(e) => e.key === "Enter" && handleFamilyLogin()}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-orange-800 font-medium">
                    {t("password")}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                    onKeyPress={(e) => e.key === "Enter" && handleFamilyLogin()}
                  />
                </div>

                {loginError && <p className="text-red-600 text-sm">{loginError}</p>}

                <Button
                  onClick={handleFamilyLogin}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 text-lg shadow-lg"
                >
                  {t("login")}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="guest" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guestName" className="text-orange-800 font-medium">
                    {t("guestName")}
                  </Label>
                  <Input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t("guestNamePlaceholder")}
                    className="border-orange-200 focus:border-orange-400"
                    onKeyPress={(e) => e.key === "Enter" && handleGuestLogin()}
                  />
                </div>

                <Button
                  onClick={handleGuestLogin}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 text-lg shadow-lg"
                >
                  {t("loginAsGuest")}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="text-sm text-orange-600">{t("ready")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
