"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, PieChartIcon, BarChart2, Clock, Filter, Download } from "lucide-react"

// Portfolio performance data
const performanceData = {
  "1D": [
    { date: "9:30", value: 728000 },
    { date: "11:30", value: 728500 },
    { date: "13:30", value: 728300 },
    { date: "15:30", value: 728765 },
  ],
  "1W": [
    { date: "Mon", value: 725000 },
    { date: "Tue", value: 726500 },
    { date: "Wed", value: 727200 },
    { date: "Thu", value: 728000 },
    { date: "Fri", value: 728765 },
  ],
  "1M": [
    { date: "Week 1", value: 720000 },
    { date: "Week 2", value: 723000 },
    { date: "Week 3", value: 725000 },
    { date: "Week 4", value: 728765 },
  ],
  "3M": [
    { date: "Jan", value: 710000 },
    { date: "Feb", value: 718000 },
    { date: "Mar", value: 728765 },
  ],
  "1Y": [
    { date: "Q1", value: 680000 },
    { date: "Q2", value: 695000 },
    { date: "Q3", value: 710000 },
    { date: "Q4", value: 728765 },
  ],
}

// Portfolio holdings data
const holdings = [
  {
    asset: "Reliance Industries",
    amount: "50 Shares",
    avgPrice: "₹2,478.45",
    currentPrice: "₹2,487.35",
    pnl: "+₹445",
    pnlPercent: "+0.36%",
    value: "₹124,367.50",
    sector: "Oil & Gas",
    change: {
      "1D": "+0.36%",
      "1W": "+1.25%",
      "1M": "+3.45%",
      "3M": "+8.90%",
      "1Y": "+15.67%",
    },
  },
  {
    asset: "HDFC Bank",
    amount: "100 Shares",
    avgPrice: "₹1,645.30",
    currentPrice: "₹1,678.45",
    pnl: "+₹3,315",
    pnlPercent: "+2.01%",
    value: "₹167,845.00",
    sector: "Banking",
    change: {
      "1D": "+2.01%",
      "1W": "+3.15%",
      "1M": "+5.78%",
      "3M": "+12.34%",
      "1Y": "+22.45%",
    },
  },
  {
    asset: "Infosys",
    amount: "75 Shares",
    avgPrice: "₹1,534.25",
    currentPrice: "₹1,523.89",
    pnl: "-₹776",
    pnlPercent: "-0.67%",
    value: "₹114,291.75",
    sector: "IT",
    change: {
      "1D": "-0.67%",
      "1W": "+1.23%",
      "1M": "+4.56%",
      "3M": "+9.87%",
      "1Y": "+18.90%",
    },
  },
  {
    asset: "TCS",
    amount: "25 Shares",
    avgPrice: "₹3,456.70",
    currentPrice: "₹3,489.90",
    pnl: "+₹827.50",
    pnlPercent: "+0.96%",
    value: "₹87,247.50",
    sector: "IT",
    change: {
      "1D": "+0.96%",
      "1W": "+2.34%",
      "1M": "+5.67%",
      "3M": "+11.23%",
      "1Y": "+19.45%",
    },
  },
  {
    asset: "Bharti Airtel",
    amount: "120 Shares",
    avgPrice: "₹865.20",
    currentPrice: "₹876.45",
    pnl: "+₹1,350",
    pnlPercent: "+1.30%",
    value: "₹105,174.00",
    sector: "Telecom",
    change: {
      "1D": "+1.30%",
      "1W": "+2.45%",
      "1M": "+4.78%",
      "3M": "+8.92%",
      "1Y": "+16.34%",
    },
  },
  {
    asset: "ITC Ltd",
    amount: "200 Shares",
    avgPrice: "₹420.50",
    currentPrice: "₹415.75",
    pnl: "-₹950",
    pnlPercent: "-1.13%",
    value: "₹83,150.00",
    sector: "Consumer",
    change: {
      "1D": "-1.13%",
      "1W": "-0.45%",
      "1M": "+2.34%",
      "3M": "+5.67%",
      "1Y": "+12.45%",
    },
  },
]

// Sector allocation data
const sectorAllocation = [
  { name: "IT", value: 25 },
  { name: "Banking", value: 30 },
  { name: "Oil & Gas", value: 15 },
  { name: "Consumer", value: 20 },
  { name: "Telecom", value: 10 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#ec4899"]

export function PortfolioOverview() {
  const [timeframe, setTimeframe] = useState("1D")
  const [sortBy, setSortBy] = useState("value")
  const [filterSector, setFilterSector] = useState("all")

  // Get current timeframe data
  const currentData = performanceData[timeframe]

  // Calculate total portfolio value and P&L
  const totalValue = holdings.reduce((sum, holding) => {
    return sum + Number.parseFloat(holding.value.replace(/[^\d.-]/g, ""))
  }, 0)

  // Calculate P&L for the selected timeframe
  const calculatePnL = () => {
    const currentValue = currentData[currentData.length - 1].value
    const previousValue = currentData[0].value
    const pnlValue = currentValue - previousValue
    const pnlPercentage = (pnlValue / previousValue) * 100

    return {
      value: pnlValue,
      percentage: pnlPercentage,
    }
  }

  const pnl = calculatePnL()

  // Sort holdings based on selected criteria
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (sortBy === "value") {
      return Number.parseFloat(b.value.replace(/[^\d.-]/g, "")) - Number.parseFloat(a.value.replace(/[^\d.-]/g, ""))
    }
    if (sortBy === "change") {
      return (
        Number.parseFloat(b.change[timeframe].replace(/[^\d.-]/g, "")) -
        Number.parseFloat(a.change[timeframe].replace(/[^\d.-]/g, ""))
      )
    }
    return 0
  })

  // Filter holdings by sector if needed
  const filteredHoldings =
    filterSector === "all"
      ? sortedHoldings
      : sortedHoldings.filter((holding) => holding.sector.toLowerCase() === filterSector.toLowerCase())

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
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
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="text-xs sm:text-sm text-muted-foreground">
              {pnl.percentage >= 0 ? "+" : ""}
              {pnl.percentage.toFixed(2)}% ({timeframe})
            </p>
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
            <div className={`text-xl font-bold sm:text-2xl ${pnl.value >= 0 ? "text-green-600" : "text-red-600"}`}>
              {pnl.value >= 0 ? "+" : ""}₹{pnl.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {pnl.percentage >= 0 ? "+" : ""}
              {pnl.percentage.toFixed(2)}%
            </p>
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
              {holdings.filter((p) => Number.parseFloat(p.pnlPercent) > 0).length} profitable
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Best Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">{sortedHoldings[0].asset.split(" ")[0]}</div>
            <p className="text-xs sm:text-sm text-green-600">{sortedHoldings[0].change[timeframe]}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs md:text-sm"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    domain={["dataMin - 5000", "dataMax + 5000"]}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString()}`, "Value"]}
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
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Allocation"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Holdings</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="value">Sort by Value</SelectItem>
                <SelectItem value="change">Sort by Change</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Banking">Banking</SelectItem>
                <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                <SelectItem value="Consumer">Consumer</SelectItem>
                <SelectItem value="Telecom">Telecom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Avg. Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Change ({timeframe})</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHoldings.map((holding) => (
                  <TableRow key={holding.asset} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{holding.asset}</div>
                      <div className="text-xs text-muted-foreground">{holding.sector}</div>
                    </TableCell>
                    <TableCell>{holding.amount}</TableCell>
                    <TableCell className="hidden md:table-cell">{holding.avgPrice}</TableCell>
                    <TableCell>{holding.currentPrice}</TableCell>
                    <TableCell
                      className={holding.change[timeframe].startsWith("+") ? "text-green-600" : "text-red-600"}
                    >
                      {holding.change[timeframe]}
                    </TableCell>
                    <TableCell>
                      <div>{holding.value}</div>
                      <div
                        className={
                          holding.pnlPercent.startsWith("+") ? "text-xs text-green-600" : "text-xs text-red-600"
                        }
                      >
                        {holding.pnl} ({holding.pnlPercent})
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredHoldings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No holdings found for the selected filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

