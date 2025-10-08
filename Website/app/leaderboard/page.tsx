import { Suspense } from "react"
import { ClientLeaderboardPage } from "@/components/client-leaderboard-page"
import { LoadingState } from "@/components/loading-state"

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ClientLeaderboardPage />
    </Suspense>
  )
}

