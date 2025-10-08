"use client"

import { Home, LineChart, BarChart3, Trophy, Lightbulb, Settings, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const routes = [
  {
    title: "Dashboard",
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
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b bg-background px-4 py-2 md:hidden">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <LineChart className="h-5 w-5" />
        <span>TradePro</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0">
          <nav className="flex flex-col gap-1 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  pathname === route.href ? "bg-accent" : "transparent",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

