import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"
import type { User, Dish, Comment, Selection } from "./types"

const DATA_DIR = join(process.cwd(), "data")
const USERS_FILE = join(DATA_DIR, "users.json")
const DISHES_FILE = join(DATA_DIR, "dishes.json")
const COMMENTS_FILE = join(DATA_DIR, "comments.json")
const SELECTIONS_FILE = join(DATA_DIR, "selections.json")

// 确保数据目录存在
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    require("fs").mkdirSync(DATA_DIR, { recursive: true })
  }
}

// 读取JSON文件
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (!existsSync(filePath)) {
      return defaultValue
    }
    const data = readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return defaultValue
  }
}

// 写入JSON文件
function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDataDir()
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
  }
}

// 用户相关操作
export const userDb = {
  getAll(): User[] {
    return readJsonFile(USERS_FILE, [])
  },

  getById(id: number): User | null {
    const users = this.getAll()
    return users.find((user) => user.id === id) || null
  },

  getByUsername(username: string): User | null {
    const users = this.getAll()
    return users.find((user) => user.username === username) || null
  },

  create(userData: Omit<User, "id" | "created_at">): User {
    const users = this.getAll()
    const newUser: User = {
      ...userData,
      id: Math.max(0, ...users.map((u) => u.id)) + 1,
      created_at: new Date().toISOString(),
    }
    users.push(newUser)
    writeJsonFile(USERS_FILE, users)
    return newUser
  },

  update(id: number, userData: Partial<User>): User | null {
    const users = this.getAll()
    const index = users.findIndex((user) => user.id === id)
    if (index === -1) return null

    users[index] = { ...users[index], ...userData }
    writeJsonFile(USERS_FILE, users)
    return users[index]
  },
}

// 菜品相关操作
export const dishDb = {
  getAll(): Dish[] {
    const dishes = readJsonFile(DISHES_FILE, [])
    const comments = commentDb.getAll()
    const selections = selectionDb.getAll()

    return dishes.map((dish) => ({
      ...dish,
      comments: comments.filter((c) => c.dish_id === dish.id),
      selections: selections.filter((s) => s.dish_id === dish.id),
    }))
  },

  getById(id: number): Dish | null {
    const dishes = this.getAll()
    return dishes.find((dish) => dish.id === id) || null
  },

  create(dishData: Omit<Dish, "id" | "created_at" | "updated_at" | "comments" | "selections">): Dish {
    const dishes = readJsonFile(DISHES_FILE, [])
    const newDish = {
      ...dishData,
      id: Math.max(0, ...dishes.map((d) => d.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    dishes.push(newDish)
    writeJsonFile(DISHES_FILE, dishes)

    return {
      ...newDish,
      comments: [],
      selections: [],
    }
  },

  update(id: number, dishData: Partial<Dish>): Dish | null {
    const dishes = readJsonFile(DISHES_FILE, [])
    const index = dishes.findIndex((dish) => dish.id === id)
    if (index === -1) return null

    dishes[index] = {
      ...dishes[index],
      ...dishData,
      updated_at: new Date().toISOString(),
    }
    writeJsonFile(DISHES_FILE, dishes)

    const comments = commentDb.getAll()
    const selections = selectionDb.getAll()

    return {
      ...dishes[index],
      comments: comments.filter((c) => c.dish_id === id),
      selections: selections.filter((s) => s.dish_id === id),
    }
  },

  delete(id: number): boolean {
    const dishes = readJsonFile(DISHES_FILE, [])
    const index = dishes.findIndex((dish) => dish.id === id)
    if (index === -1) return false

    dishes.splice(index, 1)
    writeJsonFile(DISHES_FILE, dishes)

    // 删除相关的评论和选择
    commentDb.deleteByDishId(id)
    selectionDb.deleteByDishId(id)

    return true
  },
}

// 评论相关操作
export const commentDb = {
  getAll(): Comment[] {
    return readJsonFile(COMMENTS_FILE, [])
  },

  getByDishId(dishId: number): Comment[] {
    const comments = this.getAll()
    return comments.filter((comment) => comment.dish_id === dishId)
  },

  create(commentData: Omit<Comment, "id" | "created_at">): Comment {
    const comments = this.getAll()
    const newComment: Comment = {
      ...commentData,
      id: Math.max(0, ...comments.map((c) => c.id)) + 1,
      created_at: new Date().toISOString(),
    }
    comments.push(newComment)
    writeJsonFile(COMMENTS_FILE, comments)
    return newComment
  },

  update(id: number, commentData: Partial<Comment>): Comment | null {
    const comments = this.getAll()
    const index = comments.findIndex((comment) => comment.id === id)
    if (index === -1) return null

    comments[index] = { ...comments[index], ...commentData }
    writeJsonFile(COMMENTS_FILE, comments)
    return comments[index]
  },

  delete(id: number): boolean {
    const comments = this.getAll()
    const index = comments.findIndex((comment) => comment.id === id)
    if (index === -1) return false

    comments.splice(index, 1)
    writeJsonFile(COMMENTS_FILE, comments)
    return true
  },

  deleteByDishId(dishId: number): void {
    const comments = this.getAll()
    const filtered = comments.filter((comment) => comment.dish_id !== dishId)
    writeJsonFile(COMMENTS_FILE, filtered)
  },
}

// 选择相关操作
export const selectionDb = {
  getAll(): Selection[] {
    return readJsonFile(SELECTIONS_FILE, [])
  },

  getByDishId(dishId: number): Selection[] {
    const selections = this.getAll()
    return selections.filter((selection) => selection.dish_id === dishId)
  },

  create(selectionData: Omit<Selection, "id" | "created_at">): Selection {
    const selections = this.getAll()
    const newSelection: Selection = {
      ...selectionData,
      id: Math.max(0, ...selections.map((s) => s.id)) + 1,
      created_at: new Date().toISOString(),
    }
    selections.push(newSelection)
    writeJsonFile(SELECTIONS_FILE, selections)
    return newSelection
  },

  delete(dishId: number, userId: number): boolean {
    const selections = this.getAll()
    const index = selections.findIndex((s) => s.dish_id === dishId && s.user_id === userId)
    if (index === -1) return false

    selections.splice(index, 1)
    writeJsonFile(SELECTIONS_FILE, selections)
    return true
  },

  deleteByDishId(dishId: number): void {
    const selections = this.getAll()
    const filtered = selections.filter((selection) => selection.dish_id !== dishId)
    writeJsonFile(SELECTIONS_FILE, filtered)
  },

  exists(dishId: number, userId: number): boolean {
    const selections = this.getAll()
    return selections.some((s) => s.dish_id === dishId && s.user_id === userId)
  },
}

// 初始化默认数据
export function initializeData() {
  ensureDataDir()

  // 初始化用户
  const users = userDb.getAll()
  if (users.length === 0) {
    userDb.create({
      username: "admin",
      password: "password",
      display_name: "Admin",
      is_guest: false,
    })
    userDb.create({
      username: "you",
      password: "password",
      display_name: "You",
      is_guest: false,
    })
    userDb.create({
      username: "girlfriend",
      password: "password",
      display_name: "Girlfriend",
      is_guest: false,
    })
  }

  // 初始化菜品
  const dishes = readJsonFile(DISHES_FILE, [])
  if (dishes.length === 0) {
    const defaultDishes = [
      {
        name: "Yangzhou Fried Rice",
        image: "/placeholder.svg?height=200&width=300",
        category: "staple",
        ingredients: ["Rice", "Eggs", "Shrimp", "Ham", "Green peas", "Scallions", "Soy sauce"],
        available: true,
        created_by: 1,
      },
      {
        name: "Steamed White Rice",
        image: "/placeholder.svg?height=200&width=300",
        category: "staple",
        ingredients: ["Jasmine rice", "Water"],
        available: true,
        created_by: 1,
      },
      {
        name: "Hand-pulled Noodles",
        image: "/placeholder.svg?height=200&width=300",
        category: "staple",
        ingredients: ["Wheat flour", "Water", "Salt", "Alkaline water"],
        available: false,
        created_by: 1,
      },
      {
        name: "Sweet and Sour Pork",
        image: "/placeholder.svg?height=200&width=300",
        category: "meat",
        ingredients: ["Pork tenderloin", "Pineapple", "Bell peppers", "Onion", "Vinegar", "Sugar", "Ketchup"],
        available: true,
        created_by: 1,
      },
      {
        name: "Kung Pao Chicken",
        image: "/placeholder.svg?height=200&width=300",
        category: "meat",
        ingredients: ["Chicken breast", "Peanuts", "Dried chilies", "Sichuan peppercorns", "Scallions", "Garlic"],
        available: true,
        created_by: 1,
      },
      {
        name: "Braised Pork Belly",
        image: "/placeholder.svg?height=200&width=300",
        category: "meat",
        ingredients: ["Pork belly", "Soy sauce", "Rock sugar", "Shaoxing wine", "Star anise", "Ginger"],
        available: true,
        created_by: 1,
      },
      {
        name: "Mapo Tofu",
        image: "/placeholder.svg?height=200&width=300",
        category: "vegetable",
        ingredients: ["Silken tofu", "Ground pork", "Doubanjiang", "Sichuan peppercorns", "Scallions", "Garlic"],
        available: true,
        created_by: 1,
      },
      {
        name: "Stir-fried Bok Choy",
        image: "/placeholder.svg?height=200&width=300",
        category: "vegetable",
        ingredients: ["Baby bok choy", "Garlic", "Ginger", "Oyster sauce", "Sesame oil"],
        available: true,
        created_by: 1,
      },
      {
        name: "Dry-fried Green Beans",
        image: "/placeholder.svg?height=200&width=300",
        category: "vegetable",
        ingredients: ["Green beans", "Preserved vegetables", "Ground pork", "Dried chilies", "Garlic"],
        available: true,
        created_by: 1,
      },
      {
        name: "Jasmine Tea",
        image: "/placeholder.svg?height=200&width=300",
        category: "drink",
        ingredients: ["Jasmine tea leaves", "Hot water"],
        available: true,
        created_by: 1,
      },
      {
        name: "Soy Milk",
        image: "/placeholder.svg?height=200&width=300",
        category: "drink",
        ingredients: ["Soybeans", "Water", "Sugar (optional)"],
        available: true,
        created_by: 1,
      },
    ]

    defaultDishes.forEach((dish) => {
      dishDb.create(dish)
    })

    // 添加一些示例评论
    const comments = [
      {
        dish_id: 1,
        user_id: 3,
        member_name: "Girlfriend",
        text: "Love the shrimp in this! Can we add more next time?",
        likes: 1,
      },
      { dish_id: 3, user_id: 2, member_name: "You", text: "Takes too long to make on weekdays", likes: 0 },
      {
        dish_id: 4,
        user_id: 3,
        member_name: "Girlfriend",
        text: "My absolute favorite! Perfect balance of sweet and sour",
        likes: 2,
      },
      {
        dish_id: 5,
        user_id: 2,
        member_name: "You",
        text: "Love the numbing spice from Sichuan peppercorns!",
        likes: 1,
      },
      { dish_id: 7, user_id: 3, member_name: "Girlfriend", text: "So comforting and flavorful!", likes: 1 },
      {
        dish_id: 9,
        user_id: 2,
        member_name: "You",
        text: "Great texture when done right - crispy outside, tender inside",
        likes: 1,
      },
      { dish_id: 11, user_id: 3, member_name: "Girlfriend", text: "Perfect with breakfast!", likes: 1 },
    ]

    comments.forEach((comment) => {
      commentDb.create(comment)
    })
  }
}
