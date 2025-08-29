"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

type Language = "en" | "ru" | "uz"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  ru: { name: "Русский", flag: "🇷🇺" },
  uz: { name: "O'zbek", flag: "🇺🇿" },
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const handleLanguageSelect = (language: Language) => {
    console.log("[v0] Language selected:", language)
    onLanguageChange(language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent border-border hover:bg-muted relative z-50"
          onClick={() => console.log("[v0] Language selector clicked")}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languages[currentLanguage].name}</span>
          <span className="sm:hidden">{languages[currentLanguage].flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 z-[60] bg-background border-border shadow-lg">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log("[v0] Menu item clicked:", code)
              handleLanguageSelect(code as Language)
            }}
            className={`flex items-center gap-2 cursor-pointer hover:bg-muted focus:bg-muted ${
              currentLanguage === code ? "bg-muted" : ""
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
