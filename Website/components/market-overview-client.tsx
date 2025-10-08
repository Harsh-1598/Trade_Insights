"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, BarChart2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useToast } from "@/hooks/use-toast"

// Simulated real-time data - in a real app, this would come from WebSockets
const initialIndices = [
  {
    name: "NIFTY 50",
    value: 19850.25,
    change: 250.5,
    percentChange: 1.28,
    trend: "up",
  },
  {
    name: "SENSEX",
    value: 66500.75,
    change: -100.25,
    percentChange: -0.15,
    trend: "down",
  },
  {
    name: "BANK NIFTY",
    value: 44200.0,
    change: 150.0,
    percentChange: 0.34,
    trend: "up",
  },
  {
    name: "DOW JONES",
    value: 38756.5,
    change: 325.75,
    percentChange: 0.85,
    trend: "up",
  },
]

const marketData = {
  "1D": [
    { time: "9:30", value: 19750 },
    { time: "10:30", value: 19800 },
    { time: "11:30", value: 19780 },
    { time: "12:30", value: 19820 },
    { time: "13:30", value: 19850 },
    { time: "14:30", value: 19830 },
    { time: "15:30", value: 19850 },
  ],
  "1W": [
    { time: "Mon", value: 19600 },
    { time: "Tue", value: 19650 },
    { time: "Wed", value: 19700 },
    { time: "Thu", value: 19780 },
    { time: "Fri", value: 19850 },
  ],
  "1M": [
    { time: "Week 1", value: 19400 },
    { time: "Week 2", value: 19550 },
    { time: "Week 3", value: 19650 },
    { time: "Week 4", value: 19850 },
  ],
}

const topMovers = [
  { name: "HDFC Bank", change: 3.5, price: 1678.45, volume: "12.5M" },
  { name: "Reliance", change: 2.8, price: 2487.35, volume: "8.2M" },
  { name: "TCS", change: -1.2, price: 3456.7, volume: "5.7M" },
  { name: "Infosys", change: 1.5, price: 1523.89, volume: "7.1M" },
]

const marketNews = [
  {
    title: "Fed signals potential rate cut in upcoming meeting",
    time: "2 hours ago",
    source: "Financial Times",
    impact: "positive",
  },
  {
    title: "Tech stocks rally on strong earnings reports",
    time: "4 hours ago",
    source: "Bloomberg",
    impact: "positive",
  },
  {
    title: "Oil prices drop amid supply concerns",
    time: "6 hours ago",
    source: "Reuters",
    impact: "negative",
  },
]

export default function MarketOverviewClient() {
  const [indices, setIndices] = useState(initialIndices)
  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("line")
  const [isConnected, setIsConnected] = useState(true)
  const { toast } = useToast()

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prevIndices) =>
        prevIndices.map((index) => {
          // Random small fluctuation
          const fluctuation = (Math.random() - 0.5) * 10
          const newValue = index.value + fluctuation
          const newChange = index.change + fluctuation
          const newPercentChange = (newChange / (newValue - newChange)) * 100

          return {
            ...index,
            value: Number.parseFloat(newValue.toFixed(2)),
            change: Number.parseFloat(newChange.toFixed(2)),
            percentChange: Number.parseFloat(newPercentChange.toFixed(2)),
            trend: newChange >= 0 ? "up" : "down",
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    // Simulate connection status changes
    const connectionCheck = setTimeout(() => {
      const newConnectionStatus = Math.random() > 0.1 // 10% chance of disconnection

      if (isConnected && !newConnectionStatus) {
        toast({
          title: "Connection lost",
          description: "Attempting to reconnect to market data...",
          variant: "destructive",
        })
      } else if (!isConnected && newConnectionStatus) {
        toast({
          title: "Connected",
          description: "Successfully reconnected to market data",
        })
      }

      setIsConnected(newConnectionStatus)
    }, 15000) // Check every 15 seconds

    return () => {
      clearInterval(interval)
      clearTimeout(connectionCheck)
    }
  }, [isConnected, toast])

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Market Overview</h1>
          <p className="text-muted-foreground">
            Live market data and insights
            {!isConnected && (
              <Badge variant="destructive" className="ml-2">
                <AlertCircle className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 sm:w-[200px]">
              <TabsTrigger value="1D">1D</TabsTrigger>
              <TabsTrigger value="1W">1W</TabsTrigger>
              <TabsTrigger value="1M">1M</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-3 sm:w-[200px]">
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {indices.map((index) => (
          <Card
            key={index.name}
            className={`overflow-hidden transition-all hover:scale-105 ${
              index.trend === "up"
                ? "bg-gradient-to-br from-green-500/10 to-green-600/5"
                : "bg-gradient-to-br from-red-500/10 to-red-600/5"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold tracking-tight">{index.name}</h3>
                  {index.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold">₹{index.value.toFixed(2)}</span>
                  <span className={`font-medium ${index.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {index.change > 0 ? "+" : ""}
                    {index.change.toFixed(2)} ({index.percentChange > 0 ? "+" : ""}
                    {index.percentChange.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Market Performance</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Indicators</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" && (
                <LineChart data={marketData[timeframe]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="time"
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    domain={["dataMin - 100", "dataMax + 100"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
              {chartType === "area" && (
                <AreaChart data={marketData[timeframe]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="time"
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    domain={["dataMin - 100", "dataMax + 100"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                </AreaChart>
              )}
              {chartType === "bar" && (
                <BarChart data={marketData[timeframe]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="time"
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    domain={["dataMin - 100", "dataMax + 100"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Movers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMovers.map((stock) => (
                <div
                  key={stock.name}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{stock.name}</h4>
                    <p className="text-sm text-muted-foreground">Vol: {stock.volume}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{stock.price}</p>
                    <p className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketNews.map((news, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <Badge variant={news.impact === "positive" ? "default" : "destructive"} className="mt-0.5">
                    {news.impact === "positive" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{news.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {news.source} • {news.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

