import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`} />
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner className="h-8 w-8" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-[200px] rounded bg-muted animate-pulse" />
          <div className="h-4 w-[100px] rounded bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  )
}

