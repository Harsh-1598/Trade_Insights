"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Home, BarChart2, PieChart, Award, Lightbulb, Settings, TrendingUp, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"

export function MainNav() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const routes = [
    { id: "overview", label: "Overview", icon: Home, path: "/" },
    { id: "markets", label: "Markets", icon: BarChart2, path: "/markets" },
    { id: "portfolio", label: "Portfolio", icon: PieChart, path: "/portfolio" },
    { id: "leaderboard", label: "Leaderboard", icon: Award, path: "/leaderboard" },
    { id: "insights", label: "Insights", icon: Lightbulb, path: "/insights" },
    { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname?.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <GradientText className="text-xl font-bold">Insighter Trading</GradientText>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {routes.map((route) => (
              <Button
                key={route.id}
                variant={isActive(route.path) ? "default" : "ghost"}
                className="flex items-center gap-2"
                onClick={() => router.push(route.path)}
              >
                <route.icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-mono hidden md:flex">
              {currentTime.toLocaleTimeString()}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="font-bold">Insighter Trading</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto py-4">
                    <div className="flex flex-col gap-2 px-2">
                      {routes.map((route) => (
                        <Button
                          key={route.id}
                          variant={isActive(route.path) ? "default" : "ghost"}
                          className="flex items-center justify-start gap-3 h-12 px-4"
                          onClick={() => {
                            router.push(route.path)
                            setIsMenuOpen(false)
                          }}
                        >
                          <route.icon className="h-5 w-5" />
                          <span className="text-base">{route.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString()}</span>
                      <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? (
                          <span className="flex items-center gap-2">
                            <Sun className="h-4 w-4" /> Light Mode
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Moon className="h-4 w-4" /> Dark Mode
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}

