import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import db from "@/lib/database"
import type { GuestLoginRequest } from "@/lib/types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const body: GuestLoginRequest = await request.json()
    const { display_name } = body

    const guestName = display_name || "Guest"
    const username = `guest_${Date.now()}`

    // 创建访客用户
    const result = db
      .prepare(`
      INSERT INTO users (username, password, display_name, is_guest)
      VALUES (?, '', ?, TRUE)
    `)
      .run(username, guestName)

    const userId = result.lastInsertRowid

    // 生成JWT token
    const token = jwt.sign(
      {
        userId,
        username,
        isGuest: true,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    const response = NextResponse.json({
      user: {
        id: userId,
        username,
        display_name: guestName,
        is_guest: true,
      },
    })

    // 设置HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Guest login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
