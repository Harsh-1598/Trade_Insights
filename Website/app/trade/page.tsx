import type { Metadata } from "next"
import { TradingInterface } from "@/components/trading-interface"

export const metadata: Metadata = {
  title: "Insighter Trading - Trade",
  description: "Execute trades with real-time market data",
}

export default function TradePage() {
  return <TradingInterface />
}

