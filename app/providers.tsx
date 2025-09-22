// app/providers.tsx
"use client"

import { LanguageProvider as LanguageProvider1 } from "@/contexts/language-context"
import { LanguageProvider } from "@/lib/i18n"

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>
   <LanguageProvider1>{children}</LanguageProvider1>
  </LanguageProvider>
}