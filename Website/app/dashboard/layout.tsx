import type React from "react"
import { SideNav } from "@/components/side-nav"
import { TopNav } from "@/components/top-nav"
import { MobileNav } from "@/components/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="flex-1 flex">
        <SideNav className="hidden lg:block" />
        <main className="flex-1 pt-16 lg:pl-64">
          <div className="container mx-auto p-4 lg:p-8">{children}</div>
        </main>
      </div>
      <MobileNav className="lg:hidden" />
    </div>
  )
}

