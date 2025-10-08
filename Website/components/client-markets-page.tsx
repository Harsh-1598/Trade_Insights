"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Search } from "lucide-react"
import { SimpleNav } from "@/components/simple-nav"

// Static market data
const markets = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd.",
    price: "₹2,487.35",
    change24h: "+2.5%",
    volume: "₹1,234 Cr",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    price: "₹3,456.70",
    change24h: "+1.8%",
    volume: "₹876 Cr",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    price: "₹1,678.45",
    change24h: "-0.5%",
    volume: "₹654 Cr",
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd.",
    price: "₹1,523.89",
    change24h: "+1.2%",
    volume: "₹543 Cr",
  },
]

export default function ClientMarketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mounted, setMounted] = useState(false)

  // Only run client-side code after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return <div className="p-8">Loading...</div>
  }

  const filteredMarkets = markets.filter(
    (market) =>
      market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <SimpleNav />
      <div className="mt-16 flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Markets</h1>
          <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {filteredMarkets.slice(0, 3).map((market) => (
              <Card key={market.symbol} className="overflow-hidden transition-colors hover:bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">{market.symbol}</p>
                      <h3 className="font-heading text-2xl font-bold tracking-tight">{market.price}</h3>
                    </div>
                    <div
                      className={`flex items-center ${
                        market.change24h.startsWith("+") ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {market.change24h.startsWith("+") ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="ml-1 font-medium">{market.change24h}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{market.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">All Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMarkets.map((market) => (
                  <div key={market.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-heading font-bold">{market.symbol}</div>
                      <div className="text-sm font-medium text-muted-foreground">{market.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{market.price}</div>
                      <div className={market.change24h.startsWith("+") ? "text-green-500" : "text-red-500"}>
                        {market.change24h}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

