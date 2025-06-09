"use client"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// 直接在这里定义翻译，避免导入文件的问题
const resources = {
  en: {
    translation: {
      // 通用
      title: "🍜 Family Kitchen 🥢",
      subtitle: "Delicious Chinese dishes made with love",
      welcome: "Welcome back",
      whatToCook: "What delicious dishes shall we cook tonight?",
      logout: "Logout",
      allDishes: "🍽️ All Dishes",
      staple: "🍚 Staple",
      meat: "🥩 Meat",
      vegetable: "🥬 Vegetable",
      drink: "🍵 Drink",
      available: "✅ Available",
      notAvailable: "❌ Not Available",
      selected: "Selected",
      select: "Select",
      viewDetails: "View Details",
      ingredients: "Ingredients",
      more: "more",
      availableForDinner: "Available for dinner?",
      tonightSelections: "Tonight's Dinner Selections 🍽️",
      selected2: "selected:",
      noSelections: "No selections yet",
      addNewDish: "Add New Delicious Dish 🍳",
      language: "Language",
      guest: "Guest",
      backToMenu: "Back to Menu",
      selected3: "Selected ✨",
      selectDish: "Select This Dish 🍽️",
      ingredients2: "🥘 Ingredients",
      commentsNotes: "Comments & Notes",
      noComments: "No comments yet. Be the first to share your thoughts about this delicious dish! 😋",
      addComment: "Add your comment",
      commentPlaceholder: "Share your thoughts, cooking tips, or suggestions... 🍳",
      postComment: "Post Comment 📝",
      availability: "🍽️ Availability",
      availableTonight: "This dish is available for tonight's dinner ✨",
      notAvailableTonight: "This dish is not available tonight 😔",
      familySelections: "👨‍👩‍👧‍👦 Family Selections",
      wantsThisDish: "wants this dish! 😋",
      noSelections2: "No one has selected this dish yet 🤔",
      quickInfo: "📊 Quick Info",
      category: "🍽️ Category:",
      ingredientsCount: "🥘 Ingredients:",
      commentsCount: "💬 Comments:",
      items: "items",
      save: "Save",
      cancel: "Cancel",
      dishNotFound: "Dish not found",
      familyLogin: "Family Login",
      guestLogin: "Guest Access",
      username: "Username",
      password: "Password",
      guestName: "Your Name (Optional)",
      guestNamePlaceholder: "Enter your name or leave blank",
      login: "Enter Kitchen 🍳",
      loginAsGuest: "Join as Guest 👋",
      ready: "Ready to create some delicious memories? 😋",
      invalidCredentials: "Invalid username or password",
      usernameRequired: "Username is required",
      passwordRequired: "Password is required",
      shareRecipe: "Share a delicious recipe with the family!",
      basicInfo: "Basic Information",
      dishName: "Dish Name *",
      dishNamePlaceholder: "e.g., Grandma's Dumplings",
      category2: "Category *",
      selectCategory: "Select a category",
      addIngredient: "Add an ingredient...",
      addedIngredients: "Added Ingredients:",
      dishPhoto: "Dish Photo",
      uploadPhoto: "Upload a delicious photo of your dish",
      browseOrDrag: "Click to browse or drag and drop",
      choosePhoto: "Choose Photo",
      preview: "Preview",
      dishNamePreview: "Dish Name",
      addToMenu: "🍽️ Add to Family Menu",

      // 菜品名称
      "Yangzhou Fried Rice": "Yangzhou Fried Rice",
      "Steamed White Rice": "Steamed White Rice",
      "Hand-pulled Noodles": "Hand-pulled Noodles",
      "Sweet and Sour Pork": "Sweet and Sour Pork",
      "Kung Pao Chicken": "Kung Pao Chicken",
      "Braised Pork Belly": "Braised Pork Belly",
      "Mapo Tofu": "Mapo Tofu",
      "Stir-fried Bok Choy": "Stir-fried Bok Choy",
      "Dry-fried Green Beans": "Dry-fried Green Beans",
      "Jasmine Tea": "Jasmine Tea",
      "Soy Milk": "Soy Milk",
    },
  },
  zh: {
    translation: {
      // 通用
      title: "🍜 家庭厨房 🥢",
      subtitle: "用爱制作的美味中式菜肴",
      welcome: "欢迎回来",
      whatToCook: "今晚我们要做什么美味的菜呢？",
      logout: "退出登录",
      allDishes: "🍽️ 所有菜品",
      staple: "🍚 主食",
      meat: "🥩 荤菜",
      vegetable: "🥬 素菜",
      drink: "🍵 饮品",
      available: "✅ 可制作",
      notAvailable: "❌ 不可制作",
      selected: "已选择",
      select: "选择",
      viewDetails: "查看详情",
      ingredients: "食材",
      more: "更多",
      availableForDinner: "今晚可以制作？",
      tonightSelections: "今晚的晚餐选择 🍽️",
      selected2: "选择了：",
      noSelections: "还没有选择",
      addNewDish: "添加新的美味菜品 🍳",
      language: "语言",
      guest: "访客",
      backToMenu: "返回菜单",
      selected3: "已选择 ✨",
      selectDish: "选择这道菜 🍽️",
      ingredients2: "🥘 食材",
      commentsNotes: "评论和备注",
      noComments: "还没有评论。快来第一个分享您对这道美味菜品的想法吧！😋",
      addComment: "添加您的评论",
      commentPlaceholder: "分享您的想法、烹饪技巧或建议... 🍳",
      postComment: "发表评论 📝",
      availability: "🍽️ 可用性",
      availableTonight: "这道菜今晚可以制作 ✨",
      notAvailableTonight: "这道菜今晚不可制作 😔",
      familySelections: "👨‍👩‍👧‍👦 家庭选择",
      wantsThisDish: "想要这道菜！😋",
      noSelections2: "还没有人选择这道菜 🤔",
      quickInfo: "📊 快速信息",
      category: "🍽️ 分类：",
      ingredientsCount: "🥘 食材：",
      commentsCount: "💬 评论：",
      items: "项",
      save: "保存",
      cancel: "取消",
      dishNotFound: "未找到菜品",
      familyLogin: "家庭成员登录",
      guestLogin: "访客登录",
      username: "用户名",
      password: "密码",
      guestName: "您的姓名（可选）",
      guestNamePlaceholder: "输入您的姓名或留空",
      login: "进入厨房 🍳",
      loginAsGuest: "以访客身份加入 👋",
      ready: "准备好创造美味回忆了吗？😋",
      invalidCredentials: "用户名或密码错误",
      usernameRequired: "请输入用户名",
      passwordRequired: "请输入密码",
      shareRecipe: "与家人分享美味食谱！",
      basicInfo: "基本信息",
      dishName: "菜品名称 *",
      dishNamePlaceholder: "例如：奶奶的饺子",
      category2: "分类 *",
      selectCategory: "选择分类",
      addIngredient: "添加食材...",
      addedIngredients: "已添加的食材：",
      dishPhoto: "菜品照片",
      uploadPhoto: "上传您菜品的美味照片",
      browseOrDrag: "点击浏览或拖拽上传",
      choosePhoto: "选择照片",
      preview: "预览",
      dishNamePreview: "菜品名称",
      addToMenu: "🍽️ 添加到家庭菜单",

      // 菜品名称
      "Yangzhou Fried Rice": "扬州炒饭",
      "Steamed White Rice": "白米饭",
      "Hand-pulled Noodles": "手擀面",
      "Sweet and Sour Pork": "糖醋里脊",
      "Kung Pao Chicken": "宫保鸡丁",
      "Braised Pork Belly": "红烧肉",
      "Mapo Tofu": "麻婆豆腐",
      "Stir-fried Bok Choy": "清炒小白菜",
      "Dry-fried Green Beans": "干煸四季豆",
      "Jasmine Tea": "茉莉花茶",
      "Soy Milk": "豆浆",
    },
  },
}

// 确保只初始化一次
let isInitialized = false

const initI18n = () => {
  if (isInitialized) return i18n

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    })
    .then(() => {
      console.log("i18n initialized successfully")
      isInitialized = true
    })
    .catch((error) => {
      console.error("i18n initialization failed:", error)
    })

  return i18n
}

// 导出初始化后的实例
export default initI18n()

// 导出一个简单的语言切换函数
export const toggleLanguage = () => {
  const currentLang = i18n.language
  const newLang = currentLang === "en" ? "zh" : "en"
  i18n.changeLanguage(newLang)
  return newLang
}
