"use client"

import { Home, LineChart, BarChart3, Trophy, Lightbulb } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const routes = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Markets",
    icon: LineChart,
    href: "/markets",
  },
  {
    title: "Portfolio",
    icon: BarChart3,
    href: "/portfolio",
  },
  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
  {
    title: "Insights",
    icon: Lightbulb,
    href: "/insights",
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="mobile-nav md:hidden">
      <div className="flex items-center justify-around">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "mobile-nav-item transition-smooth",
              pathname === route.href ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            <route.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{route.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

