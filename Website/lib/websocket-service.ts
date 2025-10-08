// This is a mock WebSocket service for demonstration purposes
// In a real application, you would connect to a real WebSocket server

type WebSocketCallback = (data: any) => void
type WebSocketErrorCallback = (error: Event) => void

// Check if we're running on the client side
const isClient = typeof window !== "undefined"

class MockWebSocketService {
  private connected = false
  private subscriptions: Map<string, WebSocketCallback[]> = new Map()
  private errorListeners: WebSocketErrorCallback[] = []
  private connectionListeners: Array<(connected: boolean) => void> = []
  private intervals: NodeJS.Timeout[] = []

  connect(): Promise<void> {
    return new Promise((resolve) => {
      // Only attempt to connect if we're on the client
      if (!isClient) {
        resolve()
        return
      }

      setTimeout(() => {
        this.connected = true
        this.notifyConnectionListeners(true)
        this.startMockDataStreams()
        resolve()
      }, 1000)
    })
  }

  private startMockDataStreams() {
    if (!isClient) return

    // Simulate market data updates
    this.intervals.push(
      setInterval(() => {
        if (this.subscriptions.has("market_data")) {
          const callbacks = this.subscriptions.get("market_data") || []
          callbacks.forEach((callback) => {
            callback({
              type: "market_data",
              data: {
                symbol: "NIFTY50",
                price: 19800 + Math.random() * 100,
                change: (Math.random() * 2 - 1) * 10,
                volume: Math.floor(Math.random() * 1000000),
                timestamp: new Date().toISOString(),
              },
            })
          })
        }
      }, 2000),
    )

    // Simulate order updates
    this.intervals.push(
      setInterval(() => {
        if (this.subscriptions.has("order_update")) {
          const callbacks = this.subscriptions.get("order_update") || []
          callbacks.forEach((callback) => {
            callback({
              type: "order_update",
              data: {
                orderId: `ORD-${Math.floor(Math.random() * 1000)}`,
                status: ["pending", "filled", "partial", "cancelled"][Math.floor(Math.random() * 4)],
                timestamp: new Date().toISOString(),
              },
            })
          })
        }
      }, 5000),
    )

    // Simulate connection issues occasionally
    this.intervals.push(
      setInterval(() => {
        if (Math.random() < 0.1) {
          this.connected = false
          this.notifyConnectionListeners(false)

          // Reconnect after a delay
          setTimeout(() => {
            this.connected = true
            this.notifyConnectionListeners(true)
          }, 3000)
        }
      }, 30000),
    )
  }

  subscribe(type: string, callback: WebSocketCallback) {
    if (!this.subscriptions.has(type)) {
      this.subscriptions.set(type, [])
    }
    this.subscriptions.get(type)?.push(callback)
  }

  unsubscribe(type: string, callback: WebSocketCallback) {
    if (this.subscriptions.has(type)) {
      const callbacks = this.subscriptions.get(type) || []
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
      if (callbacks.length === 0) {
        this.subscriptions.delete(type)
      }
    }
  }

  onError(callback: WebSocketErrorCallback) {
    this.errorListeners.push(callback)
  }

  onConnectionChange(callback: (connected: boolean) => void) {
    this.connectionListeners.push(callback)
  }

  private notifyConnectionListeners(connected: boolean) {
    this.connectionListeners.forEach((listener) => listener(connected))
  }

  send(data: any) {
    if (isClient) {
      console.log("Mock WebSocket send:", data)
    }
  }

  isConnected(): boolean {
    return isClient ? this.connected : false
  }

  disconnect() {
    this.connected = false
    if (isClient) {
      this.intervals.forEach(clearInterval)
      this.intervals = []
    }
  }
}

// Create a singleton instance only on the client side
let webSocketServiceInstance: MockWebSocketService

// Export a function to get the instance safely
export function getWebSocketService() {
  if (isClient) {
    if (!webSocketServiceInstance) {
      webSocketServiceInstance = new MockWebSocketService()
    }
    return webSocketServiceInstance
  }

  // Return a dummy implementation for server-side rendering
  return {
    connect: () => Promise.resolve(),
    subscribe: () => {},
    unsubscribe: () => {},
    onError: () => {},
    onConnectionChange: () => {},
    send: () => {},
    isConnected: () => false,
    disconnect: () => {},
  }
}

