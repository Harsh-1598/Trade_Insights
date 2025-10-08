"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: "1" | "2" | "3" | "4" | "5"
  glassmorphism?: boolean
  hover?: boolean
  children: React.ReactNode
}

export function EnhancedCard({
  gradient = "1",
  glassmorphism = false,
  hover = true,
  className,
  children,
  ...props
}: EnhancedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg border p-6",
        glassmorphism && "glass",
        hover && "card-hover",
        `bg-gradient-${gradient}`,
        className,
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,.1), transparent 40%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

