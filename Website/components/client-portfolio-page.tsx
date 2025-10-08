"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart2, PieChartIcon } from "lucide-react"
import { SimpleNav } from "@/components/simple-nav"

// Static portfolio data
const holdings = [
  {
    asset: "Reliance Industries",
    amount: "50 Shares",
    avgPrice: "₹2,478.45",
    currentPrice: "₹2,487.35",
    pnl: "+₹445",
    pnlPercent: "+0.36%",
    value: "₹124,367.50",
  },
  {
    asset: "HDFC Bank",
    amount: "100 Shares",
    avgPrice: "₹1,645.30",
    currentPrice: "₹1,678.45",
    pnl: "+₹3,315",
    pnlPercent: "+2.01%",
    value: "₹167,845.00",
  },
  {
    asset: "Infosys",
    amount: "75 Shares",
    avgPrice: "₹1,534.25",
    currentPrice: "₹1,523.89",
    pnl: "-₹776",
    pnlPercent: "-0.67%",
    value: "₹114,291.75",
  },
]

export default function ClientPortfolioPage() {
  const [timeframe, setTimeframe] = useState("1D")
  const [mounted, setMounted] = useState(false)

  // Only run client-side code after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return <div className="p-8">Loading...</div>
  }

  // Calculate total portfolio value
  const totalValue = holdings.reduce((sum, holding) => {
    return sum + Number.parseFloat(holding.value.replace(/[^\d.-]/g, ""))
  }, 0)

  return (
    <>
      <SimpleNav />
      <div className="mt-16 flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Portfolio</h1>
            <p className="text-muted-foreground">Track your investments and performance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-5 sm:w-[300px]">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="3M">3M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BarChart2 className="h-4 w-4" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold sm:text-2xl">
                ₹{totalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                Period P/L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold sm:text-2xl text-green-600">+₹2,984.00</div>
              <p className="text-xs sm:text-sm text-muted-foreground">+0.73%</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <PieChartIcon className="h-4 w-4" />
                Holdings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold sm:text-2xl">{holdings.length}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {holdings.filter((p) => p.pnlPercent.startsWith("+")).length} profitable
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.map((holding) => (
                <div
                  key={holding.asset}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                >
                  <div className="mb-2 md:mb-0">
                    <div className="font-medium">{holding.asset}</div>
                    <div className="text-sm text-muted-foreground">{holding.amount}</div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg. Price</div>
                      <div>{holding.avgPrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current</div>
                      <div>{holding.currentPrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">P&L</div>
                      <div className={holding.pnlPercent.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {holding.pnl} ({holding.pnlPercent})
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-sm text-muted-foreground">Value</div>
                    <div className="font-medium">{holding.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

