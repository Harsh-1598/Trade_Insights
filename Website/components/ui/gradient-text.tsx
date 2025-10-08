import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: "1" | "2" | "3" | "4" | "5"
}

export function GradientText({ children, className, gradient = "1" }: GradientTextProps) {
  return <span className={cn("bg-clip-text text-transparent", `bg-gradient-${gradient}`, className)}>{children}</span>
}

