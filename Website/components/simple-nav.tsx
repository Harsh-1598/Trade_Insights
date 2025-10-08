"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, BarChart2, PieChart, Award, Lightbulb, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SimpleNavProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function SimpleNav({ activeTab: propActiveTab, setActiveTab }: SimpleNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setLocalActiveTab] = useState(propActiveTab || "overview")

  useEffect(() => {
    setMounted(true)

    // Set active tab based on pathname
    if (pathname) {
      if (pathname === "/") setLocalActiveTab("overview")
      else if (pathname.includes("/markets")) setLocalActiveTab("markets")
      else if (pathname.includes("/portfolio")) setLocalActiveTab("portfolio")
      else if (pathname.includes("/leaderboard")) setLocalActiveTab("leaderboard")
      else if (pathname.includes("/insights")) setLocalActiveTab("insights")
      else if (pathname.includes("/settings")) setLocalActiveTab("settings")
    }
  }, [pathname, propActiveTab])

  if (!mounted) {
    return null
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Home, path: "/" },
    { id: "markets", label: "Markets", icon: BarChart2, path: "/markets" },
    { id: "portfolio", label: "Portfolio", icon: PieChart, path: "/portfolio" },
    { id: "leaderboard", label: "Leaderboard", icon: Award, path: "/leaderboard" },
    { id: "insights", label: "Insights", icon: Lightbulb, path: "/insights" },
    { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ]

  const handleTabChange = (tabId: string, path: string) => {
    setLocalActiveTab(tabId)
    if (typeof setActiveTab === "function") {
      setActiveTab(tabId)
    }
    router.push(path)
  }

  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            className="flex items-center gap-2 transition-all"
            onClick={() => handleTabChange(tab.id, tab.path)}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

