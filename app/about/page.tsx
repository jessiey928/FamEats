"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Home, Heart, Users, ChefHat, Star } from "lucide-react"
import i18n from "@/lib/i18n"

export default function AboutPage() {
  const { t } = useTranslation("common")
  const router = useRouter()

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en"
    i18n.changeLanguage(newLanguage)
  }

  const features = [
    {
      icon: <ChefHat className="h-8 w-8 text-orange-500" />,
      title: "精美菜品展示",
      description: "展示各种美味的中式菜肴，包含详细的食材信息和制作说明",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "家庭协作",
      description: "家庭成员可以一起选择今晚的菜品，让用餐决策变得简单有趣",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "评论互动",
      description: "分享烹饪心得，为喜爱的菜品留下评论和建议",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "多语言支持",
      description: "支持中文和英文界面，满足不同用户的语言需求",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <Home className="h-4 w-4 mr-2" />
              首页
            </Button>
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

        {/* Hero Section */}
        <Card className="mb-8 border-orange-200 shadow-lg bg-gradient-to-r from-orange-100 to-amber-100">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                🍜 家庭厨房 🥢
              </h1>
              <p className="text-xl text-amber-700 font-medium mb-4">用爱制作的美味中式菜肴</p>
              <div className="flex justify-center items-center gap-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
                <span className="text-orange-700 ml-2 font-medium">让每一餐都充满温暖</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-orange-50 border-orange-300 text-orange-800 px-4 py-2 text-lg">
              版本 1.0.0
            </Badge>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="flex items-center gap-3 text-orange-900">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-orange-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Heart className="h-6 w-6 text-red-500" />
              我们的使命
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-orange-800 text-lg leading-relaxed">
              家庭厨房致力于让每个家庭的用餐时光变得更加美好。我们相信，美食不仅仅是填饱肚子，
              更是连接家人情感的纽带。通过这个平台，家庭成员可以一起参与菜品选择，分享烹饪心得，
              让每一餐都充满爱与温暖。
            </p>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="text-orange-900">技术栈</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Next.js 15",
                "React 18",
                "TypeScript",
                "Tailwind CSS",
                "shadcn/ui",
                "React i18next",
                "Lucide Icons",
                "Vercel",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-blue-50 border-blue-200 text-blue-800 justify-center py-2"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="text-orange-900">联系我们</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-orange-700 mb-4">如果您有任何建议或问题，欢迎与我们联系！</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => router.push("/menu")}
              >
                开始使用
              </Button>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
                onClick={() => router.push("/settings")}
              >
                查看设置
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
