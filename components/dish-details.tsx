"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ThumbsUp, MessageSquare, ArrowLeft, Check, Plus, Globe, Edit, Trash2 } from "lucide-react"

interface DishDetailsProps {
  dish: any
  currentUser: string
  onBack: () => void
  onUpdate: (dish: any) => void
  language: "en" | "zh"
  onLanguageToggle: () => void
  isAdmin?: boolean
}

export default function DishDetails({
  dish,
  currentUser,
  onBack,
  onUpdate,
  language,
  onLanguageToggle,
  isAdmin = false,
}: DishDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null)
  const [editingCommentText, setEditingCommentText] = useState("")

  const translations = {
    en: {
      backToMenu: "Back to Menu",
      available: "✅ Available",
      notAvailable: "❌ Not Available",
      selected: "Selected ✨",
      selectDish: "Select This Dish 🍽️",
      ingredients: "🥘 Ingredients",
      commentsNotes: "Comments & Notes",
      noComments: "No comments yet. Be the first to share your thoughts about this delicious dish! 😋",
      addComment: "Add your comment",
      commentPlaceholder: "Share your thoughts, cooking tips, or suggestions... 🍳",
      postComment: "Post Comment 📝",
      availability: "🍽️ Availability",
      availableForDinner: "Available for dinner?",
      availableTonight: "This dish is available for tonight's dinner ✨",
      notAvailableTonight: "This dish is not available tonight 😔",
      familySelections: "👨‍👩‍👧‍👦 Family Selections",
      wantsThisDish: "wants this dish! 😋",
      noSelections: "No one has selected this dish yet 🤔",
      quickInfo: "📊 Quick Info",
      category: "🍽️ Category:",
      ingredientsCount: "🥘 Ingredients:",
      commentsCount: "💬 Comments:",
      items: "items",
    },
    zh: {
      backToMenu: "返回菜单",
      available: "✅ 可制作",
      notAvailable: "❌ 不可制作",
      selected: "已选择 ✨",
      selectDish: "选择这道菜 🍽️",
      ingredients: "🥘 食材",
      commentsNotes: "评论和备注",
      noComments: "还没有评论。快来第一个分享您对这道美味菜品的想法吧！😋",
      addComment: "添加您的评论",
      commentPlaceholder: "分享您的想法、烹饪技巧或建议... 🍳",
      postComment: "发表评论 📝",
      availability: "🍽️ 可用性",
      availableForDinner: "今晚可以制作？",
      availableTonight: "这道菜今晚可以制作 ✨",
      notAvailableTonight: "这道菜今晚不可制作 😔",
      familySelections: "👨‍👩‍👧‍👦 家庭选择",
      wantsThisDish: "想要这道菜！😋",
      noSelections: "还没有人选择这道菜 🤔",
      quickInfo: "📊 快速信息",
      category: "🍽️ 分类：",
      ingredientsCount: "🥘 食材：",
      commentsCount: "💬 评论：",
      items: "项",
    },
  }

  const t = translations[language]

  const addComment = () => {
    if (!newComment.trim()) return

    const updatedDish = {
      ...dish,
      comments: [...dish.comments, { member: currentUser, text: newComment, likes: 0 }],
    }
    onUpdate(updatedDish)
    setNewComment("")
  }

  const toggleSelection = () => {
    const hasSelected = dish.selections.includes(currentUser)
    const updatedDish = {
      ...dish,
      selections: hasSelected
        ? dish.selections.filter((selector: string) => selector !== currentUser)
        : [...dish.selections, currentUser],
    }
    onUpdate(updatedDish)
  }

  const toggleAvailability = () => {
    const updatedDish = {
      ...dish,
      available: !dish.available,
    }
    onUpdate(updatedDish)
  }

  const likeComment = (commentIndex: number) => {
    const updatedComments = dish.comments.map((comment: any, index: number) =>
      index === commentIndex ? { ...comment, likes: comment.likes + 1 } : comment,
    )
    const updatedDish = {
      ...dish,
      comments: updatedComments,
    }
    onUpdate(updatedDish)
  }

  const editComment = (commentIndex: number) => {
    setEditingCommentIndex(commentIndex)
    setEditingCommentText(dish.comments[commentIndex].text)
  }

  const saveEditComment = (commentIndex: number) => {
    const updatedComments = dish.comments.map((comment: any, index: number) =>
      index === commentIndex ? { ...comment, text: editingCommentText } : comment,
    )
    const updatedDish = {
      ...dish,
      comments: updatedComments,
    }
    onUpdate(updatedDish)
    setEditingCommentIndex(null)
    setEditingCommentText("")
  }

  const cancelEditComment = () => {
    setEditingCommentIndex(null)
    setEditingCommentText("")
  }

  const deleteComment = (commentIndex: number) => {
    const updatedComments = dish.comments.filter((_: any, index: number) => index !== commentIndex)
    const updatedDish = {
      ...dish,
      comments: updatedComments,
    }
    onUpdate(updatedDish)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToMenu}
          </Button>
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

        {/* Dish Header */}
        <Card className="mb-6 border-orange-200 shadow-lg">
          <div className="relative">
            <img
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            {dish.available ? (
              <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 shadow-lg">{t.available}</Badge>
            ) : (
              <Badge variant="destructive" className="absolute top-4 right-4 shadow-lg">
                {t.notAvailable}
              </Badge>
            )}
          </div>
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2 text-orange-900">{dish.name}</CardTitle>
                <div className="flex items-center gap-4 text-amber-700">
                  <Badge variant="outline" className="capitalize bg-amber-50 border-amber-200 text-amber-800">
                    {dish.category}
                  </Badge>
                </div>
              </div>
              <Button
                size="lg"
                className={`shadow-lg font-medium ${
                  dish.selections.includes(currentUser)
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                }`}
                onClick={toggleSelection}
                disabled={!dish.available}
              >
                {dish.selections.includes(currentUser) ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t.selected}
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    {t.selectDish}
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Dish Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ingredients */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.ingredients}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dish.ingredients.map((ingredient: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-amber-50 border-amber-200 text-amber-800 justify-center py-3 text-sm"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <MessageSquare className="h-5 w-5" />
                  {t.commentsNotes} ({dish.comments.length}) 💬
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {dish.comments.length > 0 ? (
                  <div className="space-y-4">
                    {dish.comments.map((comment: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border-2 border-orange-300">
                              <AvatarFallback className="bg-orange-200 text-orange-800">
                                {comment.member[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-orange-900">{comment.member}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-1 text-amber-600 hover:text-orange-600 hover:bg-orange-100"
                              onClick={() => likeComment(idx)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{comment.likes}</span>
                            </Button>
                            {(comment.member === currentUser || isAdmin) && (
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:bg-blue-50"
                                  onClick={() => editComment(idx)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => deleteComment(idx)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        {editingCommentIndex === idx ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                              className="w-full border-orange-200 focus:border-orange-400"
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => saveEditComment(idx)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                {language === "en" ? "Save" : "保存"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => cancelEditComment()}
                                className="border-gray-300"
                              >
                                {language === "en" ? "Cancel" : "取消"}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-orange-800">{comment.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-amber-600 italic text-center py-8">{t.noComments}</p>
                )}

                {/* Add Comment Form */}
                <div className="border-t border-orange-200 pt-4">
                  <div className="space-y-3">
                    <Label htmlFor="comment" className="text-orange-800 font-medium">
                      {t.addComment}
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder={t.commentPlaceholder}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full border-orange-200 focus:border-orange-400"
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={addComment}
                        disabled={!newComment.trim()}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {t.postComment}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            {/* Availability Control */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.availability}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="available" className="font-medium text-orange-800">
                    {t.availableForDinner}
                  </Label>
                  <Switch id="available" checked={dish.available} onCheckedChange={toggleAvailability} />
                </div>
                <p className="text-sm text-amber-600 mt-2">
                  {dish.available ? t.availableTonight : t.notAvailableTonight}
                </p>
              </CardContent>
            </Card>

            {/* Who Selected This */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.familySelections}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {dish.selections.length > 0 ? (
                  <div className="space-y-3">
                    {dish.selections.map((member: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Avatar className="h-6 w-6 border-2 border-green-300">
                          <AvatarFallback className="text-xs bg-green-200 text-green-800">{member[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-green-800 font-medium">
                          {member} {t.wantsThisDish}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-amber-600 text-sm italic">{t.noSelections}</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t.quickInfo}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">{t.category}</span>
                  <Badge variant="outline" className="capitalize bg-amber-50 border-amber-200 text-amber-800">
                    {dish.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">{t.ingredientsCount}</span>
                  <span className="text-sm font-medium text-orange-900">
                    {dish.ingredients.length} {t.items}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">{t.commentsCount}</span>
                  <span className="text-sm font-medium text-orange-900">{dish.comments.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
