"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"
import { BarChart2, LineChart, PieChart, Settings, Trophy, Users, Wallet } from "lucide-react"
import type React from "react" // Import React

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("fixed inset-y-0 left-0 z-20 w-64 border-r bg-background", className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          <span>TradePro</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
        <div className="space-y-4">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Trading</h2>
            <div className="space-y-1">
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard">
                  <LineChart className="mr-2 h-4 w-4" />
                  Markets
                </Link>
              </Button>
              <Button
                variant={pathname === "/dashboard/portfolio" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/portfolio">
                  <PieChart className="mr-2 h-4 w-4" />
                  Portfolio
                </Link>
              </Button>
              <Button
                variant={pathname === "/dashboard/orders" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/orders">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </Button>
            </div>
          </div>
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Social</h2>
            <div className="space-y-1">
              <Button
                variant={pathname === "/dashboard/leaderboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/leaderboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  Leaderboard
                </Link>
              </Button>
              <Button
                variant={pathname === "/dashboard/community" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/community">
                  <Users className="mr-2 h-4 w-4" />
                  Community
                </Link>
              </Button>
            </div>
          </div>
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Account</h2>
            <div className="space-y-1">
              <Button
                variant={pathname === "/dashboard/wallet" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/wallet">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </Link>
              </Button>
              <Button
                variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

