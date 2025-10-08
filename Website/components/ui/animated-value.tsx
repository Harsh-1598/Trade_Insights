"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedValueProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedValue({ value, prefix = "", suffix = "", duration = 1, className }: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const previousValue = useRef(value)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const currentValue = previousValue.current + (value - previousValue.current) * progress
      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        previousValue.current = value
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}
      {displayValue.toFixed(2)}
      {suffix}
    </span>
  )
}

