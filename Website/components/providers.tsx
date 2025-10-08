"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"

// Dynamically import the AuthProvider with no SSR
const AuthProviderClient = dynamic(() => import("@/contexts/auth-context").then((mod) => mod.AuthProvider), {
  ssr: false,
})

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem {...props}>
      <AuthProviderClient>
        {children}
        <Toaster />
      </AuthProviderClient>
    </NextThemesProvider>
  )
}

