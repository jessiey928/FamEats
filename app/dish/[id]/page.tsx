"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ThumbsUp, MessageSquare, ArrowLeft, Check, Plus, Globe, Edit, Trash2, Home } from "lucide-react"
import { useApp } from "@/lib/context"
import i18n from "@/lib/i18n"

export default function DishDetailsPage() {
  const { t } = useTranslation()
  const { currentUser, menuItems, updateMenuItem, getTranslatedDish } = useApp()
  const router = useRouter()
  const params = useParams()
  const dishId = Number.parseInt(params.id as string)

  const [newComment, setNewComment] = useState("")
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null)
  const [editingCommentText, setEditingCommentText] = useState("")

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login")
    }
  }, [currentUser, router])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700">Loading...</p>
        </div>
      </div>
    )
  }

  const dish = menuItems.find((item) => item.id === dishId)

  if (!dish) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-900 mb-4">{t("dishNotFound")}</h1>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push("/menu")} className="bg-orange-500 hover:bg-orange-600 text-white">
              {t("backToMenu")}
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="border-orange-300 text-orange-700">
              <Home className="h-4 w-4 mr-2" />
              首页
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const translatedDish = getTranslatedDish(dish)
  const currentUserName = currentUser.displayName || currentUser.username
  const isAdmin = !currentUser.isGuest

  const addComment = () => {
    if (!newComment.trim()) return

    const updatedDish = {
      ...dish,
      comments: [...dish.comments, { member: currentUserName, text: newComment, likes: 0 }],
    }
    updateMenuItem(updatedDish)
    setNewComment("")
  }

  const toggleSelection = () => {
    const hasSelected = dish.selections.includes(currentUserName)
    const updatedDish = {
      ...dish,
      selections: hasSelected
        ? dish.selections.filter((selector: string) => selector !== currentUserName)
        : [...dish.selections, currentUserName],
    }
    updateMenuItem(updatedDish)
  }

  const toggleAvailability = () => {
    const updatedDish = {
      ...dish,
      available: !dish.available,
    }
    updateMenuItem(updatedDish)
  }

  const likeComment = (commentIndex: number) => {
    const updatedComments = dish.comments.map((comment: any, index: number) =>
      index === commentIndex ? { ...comment, likes: comment.likes + 1 } : comment,
    )
    const updatedDish = {
      ...dish,
      comments: updatedComments,
    }
    updateMenuItem(updatedDish)
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
    updateMenuItem(updatedDish)
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
    updateMenuItem(updatedDish)
  }

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en"
    i18n.changeLanguage(newLanguage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
              onClick={() => router.push("/menu")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("backToMenu")}
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

        {/* Dish Header */}
        <Card className="mb-6 border-orange-200 shadow-lg">
          <div className="relative">
            <img
              src={translatedDish.image || "/placeholder.svg"}
              alt={translatedDish.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            {translatedDish.available ? (
              <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 shadow-lg">
                {t("available")}
              </Badge>
            ) : (
              <Badge variant="destructive" className="absolute top-4 right-4 shadow-lg">
                {t("notAvailable")}
              </Badge>
            )}
          </div>
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2 text-orange-900">{translatedDish.name}</CardTitle>
                <div className="flex items-center gap-4 text-amber-700">
                  <Badge variant="outline" className="capitalize bg-amber-50 border-amber-200 text-amber-800">
                    {translatedDish.category}
                  </Badge>
                </div>
              </div>
              <Button
                size="lg"
                className={`shadow-lg font-medium ${
                  translatedDish.selections.includes(currentUserName)
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                }`}
                onClick={toggleSelection}
                disabled={!translatedDish.available}
              >
                {translatedDish.selections.includes(currentUserName) ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t("selected3")}
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    {t("selectDish")}
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
                <CardTitle className="text-orange-900">{t("ingredients2")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.isArray(translatedDish.ingredients) &&
                    translatedDish.ingredients.map((ingredient: string, idx: number) => (
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
                  {t("commentsNotes")} ({translatedDish.comments.length}) 💬
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {translatedDish.comments.length > 0 ? (
                  <div className="space-y-4">
                    {translatedDish.comments.map((comment: any, idx: number) => (
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
                            {(comment.member === currentUserName || isAdmin) && (
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
                                {t("save")}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => cancelEditComment()}
                                className="border-gray-300"
                              >
                                {t("cancel")}
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
                  <p className="text-amber-600 italic text-center py-8">{t("noComments")}</p>
                )}

                {/* Add Comment Form */}
                <div className="border-t border-orange-200 pt-4">
                  <div className="space-y-3">
                    <Label htmlFor="comment" className="text-orange-800 font-medium">
                      {t("addComment")}
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder={t("commentPlaceholder")}
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
                        {t("postComment")}
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
                <CardTitle className="text-orange-900">{t("availability")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="available" className="font-medium text-orange-800">
                    {t("availableForDinner")}
                  </Label>
                  <Switch id="available" checked={translatedDish.available} onCheckedChange={toggleAvailability} />
                </div>
                <p className="text-sm text-amber-600 mt-2">
                  {translatedDish.available ? t("availableTonight") : t("notAvailableTonight")}
                </p>
              </CardContent>
            </Card>

            {/* Who Selected This */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t("familySelections")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {translatedDish.selections.length > 0 ? (
                  <div className="space-y-3">
                    {translatedDish.selections.map((member: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Avatar className="h-6 w-6 border-2 border-green-300">
                          <AvatarFallback className="text-xs bg-green-200 text-green-800">{member[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-green-800 font-medium">
                          {member} {t("wantsThisDish")}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-amber-600 text-sm italic">{t("noSelections2")}</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
                <CardTitle className="text-orange-900">{t("quickInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">{t("category")}</span>
                  <Badge variant="outline" className="capitalize bg-amber-50 border-amber-200 text-amber-800">
                    {translatedDish.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">{t("ingredientsCount")}</span>
                  <span className="text-sm font-medium text-orange-900">
                    {Array.isArray(translatedDish.ingredients) ? translatedDish.ingredients.length : 0} {t("items")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-amber-700">{t("commentsCount")}</span>
                  <span className="text-sm font-medium text-orange-900">{translatedDish.comments.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
