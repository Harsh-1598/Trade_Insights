"use client"

import { useState, useEffect, useCallback } from "react"
import { getWebSocketService } from "@/lib/websocket-service"

type WebSocketData = {
  type: string
  data: any
}

export function useWebSocket(type: string) {
  const [data, setData] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleMessage = useCallback((message: WebSocketData) => {
    setData(message.data)
  }, [])

  useEffect(() => {
    const webSocketService = getWebSocketService()

    // Connect to WebSocket if not already connected
    if (!webSocketService.isConnected()) {
      webSocketService.connect().catch((err) => {
        setError(new Error("Failed to connect to WebSocket"))
      })
    }

    // Subscribe to connection status changes
    webSocketService.onConnectionChange(setIsConnected)

    // Subscribe to the specified message type
    webSocketService.subscribe(type, handleMessage)

    // Subscribe to errors
    webSocketService.onError(() => {
      setError(new Error("WebSocket error occurred"))
    })

    // Cleanup on unmount
    return () => {
      webSocketService.unsubscribe(type, handleMessage)
    }
  }, [type, handleMessage])

  const sendMessage = useCallback(
    (data: any) => {
      const webSocketService = getWebSocketService()
      webSocketService.send({
        type,
        data,
      })
    },
    [type],
  )

  return {
    data,
    isConnected,
    error,
    sendMessage,
  }
}

