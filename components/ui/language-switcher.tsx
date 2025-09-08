"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-white hover:bg-white/10"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "Eng" : "አማ"}</span>
    </Button>
  )
}
