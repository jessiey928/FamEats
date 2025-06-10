export interface User {
  id: number
  username: string
  display_name?: string
  is_guest: boolean
  created_at: string
}

export interface Dish {
  id: number
  name: string
  image: string
  category: string
  ingredients: string[]
  available: boolean
  created_by: number
  created_at: string
  updated_at: string
  comments: Comment[]
  selections: Selection[]
}

export interface Comment {
  id: number
  dish_id: number
  user_id: number
  member_name: string
  text: string
  likes: number
  created_at: string
}

export interface Selection {
  id: number
  dish_id: number
  user_id: number
  member_name: string
  created_at: string
}

export interface CreateDishRequest {
  name: string
  image?: string
  category: string
  ingredients: string[]
  available?: boolean
}

export interface CreateCommentRequest {
  dish_id: number
  text: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface GuestLoginRequest {
  display_name?: string
}
