"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import Image from "next/image"

interface LoginFormProps {
  onToggleForm: () => void
}

export function LoginForm({ onToggleForm }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const { t } = useLanguage()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app, validate credentials
    if (username && password) {
      // Determine role based on username (mock logic)
      let role = "admin"
      if (username.includes("pre")) role = "pre-investigation"
      else if (username.includes("head")) role = "department-head"
      else if (username.includes("investigator")) role = "investigator"
      else if (username.includes("prosecutor")) role = "prosecutor"

      localStorage.setItem("userRole", role)
      localStorage.setItem("username", username)
      router.push("/dashboard")
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 border-slate-700 shadow-xl">
      <CardHeader className="text-center pb-8">
        <div className="flex justify-between items-start mb-6">
          <div></div>
          <LanguageSwitcher />
        </div>
 {/* Logo Section */}
 <div className="flex justify-center mb-6">
          <div className="rounded-full">
            <div className="w-20 h-20 relative">
            <Image
                src="/images/i.png" 
                alt="Ethiopia Federal Police Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white mb-2">{t.auth.title}</h1>
        <p className="text-lg text-slate-300">{t.auth.subtitle}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">
              {t.auth.username}
            </Label>
            <Input
              id="username"
              type="text"
              placeholder={t.auth.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/90 border-slate-300 text-gray-900 placeholder:text-gray-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              {t.auth.password}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t.auth.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/90 border-slate-300 text-gray-900 placeholder:text-gray-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-slate-300 data-[state=checked]:bg-white data-[state=checked]:text-slate-800"
              />
              <Label htmlFor="remember" className="text-sm text-slate-300">
                {t.auth.rememberMe}
              </Label>
            </div>
            <button type="button" className="text-sm text-slate-300 hover:text-white">
              {t.auth.forgotPassword}
            </button>
          </div>

          <Button type="submit" className="w-full bg-white hover:bg-slate-50 text-slate-800 font-semibold">
            {t.auth.signIn}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-slate-300">{t.auth.dontHaveAccount.split("?")[0]}? </span>
          <button onClick={onToggleForm} className="text-white hover:text-slate-300 font-semibold">
            {t.common.signup}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
