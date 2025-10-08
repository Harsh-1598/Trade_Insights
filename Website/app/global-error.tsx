"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1rem",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            maxWidth: "28rem",
            width: "100%",
            borderRadius: "0.5rem",
            border: "1px solid #334155",
            padding: "1.5rem",
            backgroundColor: "#1e293b",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <h1
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#f43f5e",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Application Error
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>
              A server-side error has occurred. Our team has been notified.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(148, 163, 184, 0.1)",
              borderRadius: "0.375rem",
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ fontSize: "0.875rem", fontFamily: "monospace", wordBreak: "break-all" }}>{error.message}</p>
            {error.digest && (
              <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem" }}>Error Digest: {error.digest}</p>
            )}
          </div>
          <Button
            onClick={() => reset()}
            style={{
              width: "100%",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Try Again
          </Button>
        </div>
      </body>
    </html>
  )
}

