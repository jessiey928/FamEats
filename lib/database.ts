import Database from "better-sqlite3"
import { join } from "path"
import { readFileSync } from "fs"

const dbPath = join(process.cwd(), "family-kitchen.db")
const db = new Database(dbPath)

// 启用外键约束
db.pragma("foreign_keys = ON")

// 初始化数据库
export function initializeDatabase() {
  try {
    // 读取并执行初始化SQL
    const initSql = readFileSync(join(process.cwd(), "scripts", "init-database.sql"), "utf8")
    db.exec(initSql)

    // 读取并执行种子数据SQL
    const seedSql = readFileSync(join(process.cwd(), "scripts", "seed-dishes.sql"), "utf8")
    db.exec(seedSql)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization failed:", error)
  }
}

// 在模块加载时初始化数据库
initializeDatabase()

export default db
