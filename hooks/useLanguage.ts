"use client"

import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import i18n from "@/lib/i18n"

export function useLanguage() {
  const { i18n: i18nInstance } = useTranslation()

  const toggleLanguage = useCallback(() => {
    try {
      const currentLanguage = i18nInstance.language || i18n.language
      const newLanguage = currentLanguage === "en" ? "zh" : "en"

      // 使用两种方式确保语言切换成功
      if (i18nInstance.changeLanguage) {
        i18nInstance.changeLanguage(newLanguage)
      } else if (i18n.changeLanguage) {
        i18n.changeLanguage(newLanguage)
      }

      console.log(`Language switched to: ${newLanguage}`)
    } catch (error) {
      console.error("Failed to change language:", error)
    }
  }, [i18nInstance])

  const currentLanguage = i18nInstance.language || i18n.language || "en"

  return {
    currentLanguage,
    toggleLanguage,
    isEnglish: currentLanguage === "en",
    isChinese: currentLanguage === "zh",
  }
}
