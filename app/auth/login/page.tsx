"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
       
          <LoginForm />
      
      </div>
    </div>
  )
}