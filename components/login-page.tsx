"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Globe, UserPlus } from "lucide-react"

interface User {
  username: string
  isGuest: boolean
  displayName?: string
}

interface LoginPageProps {
  onLogin: (user: User) => void
  language: "en" | "zh"
  onLanguageToggle: () => void
}

export default function LoginPage({ onLogin, language, onLanguageToggle }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [guestName, setGuestName] = useState("")
  const [loginError, setLoginError] = useState("")

  const translations = {
    en: {
      title: "🍜 Family Kitchen 🥢",
      subtitle: "Welcome to our delicious world!",
      familyLogin: "Family Login",
      guestLogin: "Guest Access",
      username: "Username",
      password: "Password",
      guestName: "Your Name (Optional)",
      guestNamePlaceholder: "Enter your name or leave blank",
      login: "Enter Kitchen 🍳",
      loginAsGuest: "Join as Guest 👋",
      ready: "Ready to create some delicious memories? 😋",
      invalidCredentials: "Invalid username or password",
      usernameRequired: "Username is required",
      passwordRequired: "Password is required",
    },
    zh: {
      title: "🍜 家庭厨房 🥢",
      subtitle: "欢迎来到我们的美味世界！",
      familyLogin: "家庭成员登录",
      guestLogin: "访客登录",
      username: "用户名",
      password: "密码",
      guestName: "您的姓名（可选）",
      guestNamePlaceholder: "输入您的姓名或留空",
      login: "进入厨房 🍳",
      loginAsGuest: "以访客身份加入 👋",
      ready: "准备好创造美味回忆了吗？😋",
      invalidCredentials: "用户名或密码错误",
      usernameRequired: "请输入用户名",
      passwordRequired: "请输入密码",
    },
  }

  const t = translations[language]

  // Simple hardcoded credentials for demo
  const validCredentials = [
    { username: "admin", password: "123456" },
    { username: "you", password: "password" },
    { username: "girlfriend", password: "password" },
  ]

  const handleFamilyLogin = () => {
    setLoginError("")

    if (!username.trim()) {
      setLoginError(t.usernameRequired)
      return
    }

    if (!password.trim()) {
      setLoginError(t.passwordRequired)
      return
    }

    const isValid = validCredentials.some((cred) => cred.username === username && cred.password === password)

    if (isValid) {
      onLogin({
        username: username,
        isGuest: false,
      })
    } else {
      setLoginError(t.invalidCredentials)
    }
  }

  const handleGuestLogin = () => {
    const displayName = guestName.trim() || (language === "en" ? "Guest" : "访客")
    onLogin({
      username: `guest_${Date.now()}`,
      isGuest: true,
      displayName: displayName,
    })
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
              onClick={onLanguageToggle}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "中文" : "English"}
            </Button>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t.title}
          </CardTitle>
          <p className="text-orange-700 font-medium">{t.subtitle}</p>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <Tabs defaultValue="guest" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-orange-100">
              <TabsTrigger value="guest" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                {t.guestLogin}
              </TabsTrigger>
              <TabsTrigger value="family" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <svg
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H4a4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {t.familyLogin}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="family" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-orange-800 font-medium">
                    {t.username}
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
                    {t.password}
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
                  {t.login}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="guest" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guestName" className="text-orange-800 font-medium">
                    {t.guestName}
                  </Label>
                  <Input
                    id="guestName"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={t.guestNamePlaceholder}
                    className="border-orange-200 focus:border-orange-400"
                    onKeyPress={(e) => e.key === "Enter" && handleGuestLogin()}
                  />
                </div>

                <Button
                  onClick={handleGuestLogin}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 text-lg shadow-lg"
                >
                  {t.loginAsGuest}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="text-sm text-orange-600">{t.ready}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
