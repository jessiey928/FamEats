import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import db from "./database"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthUser {
  id: number
  username: string
  display_name?: string
  is_guest: boolean
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    // 从数据库获取最新用户信息
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(decoded.userId)

    if (!user) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      is_guest: user.is_guest,
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}

export function requireAuth(handler: (request: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = await getAuthUser(request)

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    return handler(request, user)
  }
}
