"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useLanguage } from "./language-context"

interface User {
  username: string
  isGuest: boolean
  displayName?: string
}

interface MenuItem {
  id: number
  name: string
  image: string
  category: string
  ingredients: string[]
  available: boolean
  comments: Array<{
    member: string
    text: string
    likes: number
  }>
  selections: string[]
}

interface AppContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  menuItems: MenuItem[]
  setMenuItems: (items: MenuItem[]) => void
  updateMenuItem: (item: MenuItem) => void
  addMenuItem: (item: Omit<MenuItem, "id" | "comments" | "selections">) => void
  deleteMenuItem: (id: number) => void
  getTranslatedDish: (dish: MenuItem) => MenuItem
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Yangzhou Fried Rice",
      image: "/placeholder.svg?height=200&width=300",
      category: "staple",
      ingredients: ["Rice", "Eggs", "Shrimp", "Ham", "Green peas", "Scallions", "Soy sauce"],
      available: true,
      comments: [
        {
          member: "Girlfriend",
          text: "Love the shrimp in this! Can we add more next time?",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 2,
      name: "Steamed White Rice",
      image: "/placeholder.svg?height=200&width=300",
      category: "staple",
      ingredients: ["Jasmine rice", "Water"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 3,
      name: "Hand-pulled Noodles",
      image: "/placeholder.svg?height=200&width=300",
      category: "staple",
      ingredients: ["Wheat flour", "Water", "Salt", "Alkaline water"],
      available: false,
      comments: [
        {
          member: "You",
          text: "Takes too long to make on weekdays",
          likes: 0,
        },
      ],
      selections: [],
    },
    {
      id: 4,
      name: "Sweet and Sour Pork",
      image: "/placeholder.svg?height=200&width=300",
      category: "meat",
      ingredients: ["Pork tenderloin", "Pineapple", "Bell peppers", "Onion", "Vinegar", "Sugar", "Ketchup"],
      available: true,
      comments: [
        {
          member: "Girlfriend",
          text: "My absolute favorite! Perfect balance of sweet and sour",
          likes: 2,
        },
      ],
      selections: [],
    },
    {
      id: 5,
      name: "Kung Pao Chicken",
      image: "/placeholder.svg?height=200&width=300",
      category: "meat",
      ingredients: ["Chicken breast", "Peanuts", "Dried chilies", "Sichuan peppercorns", "Scallions", "Garlic"],
      available: true,
      comments: [
        {
          member: "You",
          text: "Love the numbing spice from Sichuan peppercorns!",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 6,
      name: "Braised Pork Belly",
      image: "/placeholder.svg?height=200&width=300",
      category: "meat",
      ingredients: ["Pork belly", "Soy sauce", "Rock sugar", "Shaoxing wine", "Star anise", "Ginger"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 7,
      name: "Mapo Tofu",
      image: "/placeholder.svg?height=200&width=300",
      category: "vegetable",
      ingredients: ["Silken tofu", "Ground pork", "Doubanjiang", "Sichuan peppercorns", "Scallions", "Garlic"],
      available: true,
      comments: [
        {
          member: "Girlfriend",
          text: "So comforting and flavorful!",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 8,
      name: "Stir-fried Bok Choy",
      image: "/placeholder.svg?height=200&width=300",
      category: "vegetable",
      ingredients: ["Baby bok choy", "Garlic", "Ginger", "Oyster sauce", "Sesame oil"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 9,
      name: "Dry-fried Green Beans",
      image: "/placeholder.svg?height=200&width=300",
      category: "vegetable",
      ingredients: ["Green beans", "Preserved vegetables", "Ground pork", "Dried chilies", "Garlic"],
      available: true,
      comments: [
        {
          member: "You",
          text: "Great texture when done right - crispy outside, tender inside",
          likes: 1,
        },
      ],
      selections: [],
    },
    {
      id: 10,
      name: "Jasmine Tea",
      image: "/placeholder.svg?height=200&width=300",
      category: "drink",
      ingredients: ["Jasmine tea leaves", "Hot water"],
      available: true,
      comments: [],
      selections: [],
    },
    {
      id: 11,
      name: "Soy Milk",
      image: "/placeholder.svg?height=200&width=300",
      category: "drink",
      ingredients: ["Soybeans", "Water", "Sugar (optional)"],
      available: true,
      comments: [{ member: "Girlfriend", text: "Perfect with breakfast!", likes: 1 }],
      selections: [],
    },
  ])

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const addMenuItem = (newItem: Omit<MenuItem, "id" | "comments" | "selections">) => {
    const newMenuItem: MenuItem = {
      ...newItem,
      id: Math.max(...menuItems.map((item) => item.id)) + 1,
      comments: [],
      selections: [],
    }
    setMenuItems([...menuItems, newMenuItem])
  }

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  // 简化的翻译函数
  const getTranslatedDish = (dish: MenuItem): MenuItem => {
    try {
      // 翻译菜品名称
      const translatedName = t(dish.name as any) || dish.name

      return {
        ...dish,
        name: translatedName,
      }
    } catch (error) {
      console.error("Translation error:", error)
      return dish
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        menuItems,
        setMenuItems,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        getTranslatedDish,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
