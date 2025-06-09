"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/context"

export default function HomePage() {
  const { currentUser } = useApp()
  const router = useRouter()

  useEffect(() => {
    // 如果用户已登录，重定向到菜单页面
    if (currentUser) {
      router.replace("/menu")
    } else {
      // 如果用户未登录，重定向到登录页面
      router.replace("/login")
    }
  }, [currentUser, router])

  // 显示加载状态
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-orange-800 mb-2">🍜 家庭厨房</h2>
        <p className="text-orange-600">正在加载中...</p>
      </div>
    </div>
  )
}
