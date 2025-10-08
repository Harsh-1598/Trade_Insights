import { Suspense } from "react"
import { ClientSettingsPage } from "@/components/client-settings-page"
import { LoadingState } from "@/components/loading-state"

export default function SettingsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ClientSettingsPage />
    </Suspense>
  )
}

