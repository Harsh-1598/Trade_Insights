"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, ArrowDown, BarChart3, LineChart, PieChart } from "lucide-react"
import { AnimatedValue } from "@/components/ui/animated-value"
import { GradientText } from "@/components/ui/gradient-text"
import { MainNav } from "@/components/main-nav"
import { SimpleNav } from "@/components/simple-nav"

// Mock data for different time periods
const timePeriodsData = {
  "1D": {
    marketData: [
      { name: "NIFTY 50", value: 22345.67, change: 1.23, positive: true },
      { name: "SENSEX", value: 73456.78, change: 1.45, positive: true },
      { name: "BANK NIFTY", value: 48765.43, change: -0.67, positive: false },
      { name: "NASDAQ", value: 16789.54, change: 0.89, positive: true },
    ],
    topStocks: [
      { name: "RELIANCE", price: 2876.45, change: 2.34, positive: true },
      { name: "TCS", price: 3765.2, change: 1.56, positive: true },
      { name: "HDFC BANK", price: 1678.9, change: -0.78, positive: false },
      { name: "INFOSYS", price: 1456.78, change: 0.45, positive: true },
    ],
  },
  "1W": {
    marketData: [
      { name: "NIFTY 50", value: 22156.32, change: 3.45, positive: true },
      { name: "SENSEX", value: 72987.65, change: 2.98, positive: true },
      { name: "BANK NIFTY", value: 49123.76, change: 1.23, positive: true },
      { name: "NASDAQ", value: 16543.21, change: -1.12, positive: false },
    ],
    topStocks: [
      { name: "RELIANCE", price: 2845.3, change: 5.67, positive: true },
      { name: "TCS", price: 3698.45, change: 3.21, positive: true },
      { name: "HDFC BANK", price: 1698.5, change: 2.45, positive: true },
      { name: "INFOSYS", price: 1432.65, change: -2.1, positive: false },
    ],
  },
  "1M": {
    marketData: [
      { name: "NIFTY 50", value: 21876.54, change: 5.78, positive: true },
      { name: "SENSEX", value: 71234.56, change: 4.32, positive: true },
      { name: "BANK NIFTY", value: 47654.32, change: 3.87, positive: true },
      { name: "NASDAQ", value: 16123.45, change: 2.76, positive: true },
    ],
    topStocks: [
      { name: "RELIANCE", price: 2765.8, change: 8.9, positive: true },
      { name: "TCS", price: 3598.75, change: 6.54, positive: true },
      { name: "HDFC BANK", price: 1645.3, change: 5.67, positive: true },
      { name: "INFOSYS", price: 1398.45, change: 4.32, positive: true },
    ],
  },
  "3M": {
    marketData: [
      { name: "NIFTY 50", value: 20987.65, change: 12.45, positive: true },
      { name: "SENSEX", value: 69876.54, change: 10.32, positive: true },
      { name: "BANK NIFTY", value: 46543.21, change: 8.76, positive: true },
      { name: "NASDAQ", value: 15678.9, change: 7.65, positive: true },
    ],
    topStocks: [
      { name: "RELIANCE", price: 2654.3, change: 15.67, positive: true },
      { name: "TCS", price: 3456.78, change: 12.34, positive: true },
      { name: "HDFC BANK", price: 1598.76, change: 10.23, positive: true },
      { name: "INFOSYS", price: 1345.67, change: 9.87, positive: true },
    ],
  },
  "1Y": {
    marketData: [
      { name: "NIFTY 50", value: 19876.54, change: 18.9, positive: true },
      { name: "SENSEX", value: 67654.32, change: 16.78, positive: true },
      { name: "BANK NIFTY", value: 44321.09, change: 14.56, positive: true },
      { name: "NASDAQ", value: 14567.89, change: 12.34, positive: true },
    ],
    topStocks: [
      { name: "RELIANCE", price: 2456.78, change: 25.43, positive: true },
      { name: "TCS", price: 3234.56, change: 22.1, positive: true },
      { name: "HDFC BANK", price: 1456.78, change: 18.9, positive: true },
      { name: "INFOSYS", price: 1234.56, change: 16.78, positive: true },
    ],
  },
}

export default function ClientPage() {
  const [mounted, setMounted] = useState(false)
  const [timeframe, setTimeframe] = useState("1D")
  const [currentData, setCurrentData] = useState(timePeriodsData["1D"])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setMounted(true)
    // Update data when timeframe changes
    setCurrentData(timePeriodsData[timeframe as keyof typeof timePeriodsData])
  }, [timeframe])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />

      <main className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to <GradientText>Insighter Trading</GradientText> 🚀
            </h1>
            <p className="text-muted-foreground">Your AI-powered trading companion for smarter investment decisions</p>
          </div>

          <SimpleNav activeTab={activeTab} />

          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
              <TabsList className="inline-flex w-auto">
                <TabsTrigger value="1D" className="px-4">
                  1D
                </TabsTrigger>
                <TabsTrigger value="1W" className="px-4">
                  1W
                </TabsTrigger>
                <TabsTrigger value="1M" className="px-4">
                  1M
                </TabsTrigger>
                <TabsTrigger value="3M" className="px-4">
                  3M
                </TabsTrigger>
                <TabsTrigger value="1Y" className="px-4">
                  1Y
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {currentData.marketData.map((market, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{market.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedValue value={market.value} />
                  </div>
                  <div className="flex items-center mt-1">
                    <div className={`flex items-center ${market.positive ? "text-green-500" : "text-red-500"}`}>
                      {market.positive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                      <span className="font-medium">{market.change}%</span>
                      <span className="ml-1 text-xs text-muted-foreground">({timeframe})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <LineChart className="h-8 w-8" />
                    <span>Market chart visualization for {timeframe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.topStocks.map((stock, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{stock.name}</div>
                        <div className="text-sm text-muted-foreground">₹{stock.price}</div>
                      </div>
                      <div className={`flex items-center ${stock.positive ? "text-green-500" : "text-red-500"}`}>
                        {stock.positive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                        <span>{stock.change}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trading Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-8 w-8" />
                    <span>Activity chart for {timeframe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PieChart className="h-8 w-8" />
                    <span>Allocation chart for {timeframe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

