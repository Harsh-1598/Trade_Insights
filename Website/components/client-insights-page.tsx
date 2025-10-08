"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, Target, Lightbulb, Zap, Sparkles, Brain } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import { GradientText } from "@/components/ui/gradient-text"
import { MainNav } from "@/components/main-nav"
import { SimpleNav } from "@/components/simple-nav"

// Trading patterns data for different time periods
const tradingPatternsData = {
  weekly: [
    { day: "Mon", wins: 8, losses: 3 },
    { day: "Tue", wins: 5, losses: 6 },
    { day: "Wed", wins: 12, losses: 4 },
    { day: "Thu", wins: 7, losses: 5 },
    { day: "Fri", wins: 9, losses: 2 },
  ],
  monthly: [
    { day: "Week 1", wins: 35, losses: 15 },
    { day: "Week 2", wins: 28, losses: 22 },
    { day: "Week 3", wins: 42, losses: 18 },
    { day: "Week 4", wins: 31, losses: 19 },
  ],
  "3M": [
    { day: "Jan", wins: 120, losses: 80 },
    { day: "Feb", wins: 150, losses: 70 },
    { day: "Mar", wins: 135, losses: 65 },
  ],
  "6M": [
    { day: "Oct", wins: 110, losses: 90 },
    { day: "Nov", wins: 130, losses: 70 },
    { day: "Dec", wins: 120, losses: 80 },
    { day: "Jan", wins: 140, losses: 60 },
    { day: "Feb", wins: 150, losses: 70 },
    { day: "Mar", wins: 135, losses: 65 },
  ],
  "1Y": [
    { day: "Q1", wins: 380, losses: 220 },
    { day: "Q2", wins: 420, losses: 180 },
    { day: "Q3", wins: 360, losses: 240 },
    { day: "Q4", wins: 400, losses: 200 },
  ],
}

const insightsData = {
  weekly: [
    {
      title: "Bank Nifty Pattern",
      description: "80% success rate trading Bank Nifty in the first hour",
      impact: "+₹25,000 Average Profit",
      recommendation: "Focus on Bank Nifty opening range breakout strategy",
      type: "success",
      emoji: "🚀",
    },
    {
      title: "Options Trading",
      description: "Put options trades showing higher profitability",
      impact: "+35% Higher Returns",
      recommendation: "Consider increasing put options allocation",
      type: "success",
      emoji: "💰",
    },
  ],
  monthly: [
    {
      title: "Sector Analysis",
      description: "IT sector trades yielded highest returns this month",
      impact: "+₹1,45,000 Sector Profit",
      recommendation: "Monitor IT sector momentum",
      type: "success",
      emoji: "💻",
    },
    {
      title: "Risk Management",
      description: "Stop-loss adherence improved to 95%",
      impact: "Reduced Drawdown",
      recommendation: "Maintain current risk management strategy",
      type: "success",
      emoji: "🛡️",
    },
  ],
  "3M": [
    {
      title: "Portfolio Diversification",
      description: "Balanced exposure across sectors showing results",
      impact: "18% Lower Volatility",
      recommendation: "Continue sector rotation strategy",
      type: "success",
      emoji: "🔄",
    },
    {
      title: "Trading Volume",
      description: "Increased trading activity in mid-cap stocks",
      impact: "+28% Returns in Mid-caps",
      recommendation: "Focus on mid-cap opportunities",
      type: "success",
      emoji: "📈",
    },
  ],
  "6M": [
    {
      title: "Strategy Performance",
      description: "Momentum strategy outperforming other approaches",
      impact: "+42% Strategy Returns",
      recommendation: "Increase allocation to momentum strategy",
      type: "success",
      emoji: "⚡",
    },
    {
      title: "Market Correlation",
      description: "Portfolio shows low correlation with Nifty",
      impact: "0.3 Correlation Coefficient",
      recommendation: "Maintain diversification approach",
      type: "success",
      emoji: "🧩",
    },
  ],
  "1Y": [
    {
      title: "Annual Performance",
      description: "Consistent alpha generation across market conditions",
      impact: "+15% Above Benchmark",
      recommendation: "Continue current strategic approach",
      type: "success",
      emoji: "🏆",
    },
    {
      title: "Risk-Adjusted Returns",
      description: "Sharpe ratio improved significantly",
      impact: "1.8 Sharpe Ratio",
      recommendation: "Maintain risk-adjusted focus",
      type: "success",
      emoji: "📊",
    },
  ],
}

const marketStats = {
  weekly: [
    {
      title: "Most Profitable Segment",
      value: "Bank Nifty Options",
      change: "+₹45,000",
      icon: TrendingUp,
      emoji: "💎",
    },
    {
      title: "Best Trading Session",
      value: "Morning (9:15-11:30)",
      change: "72% Win Rate",
      icon: Clock,
      emoji: "⏰",
    },
    {
      title: "Top Strategy",
      value: "Gap Trading",
      change: "85% Success",
      icon: Target,
      emoji: "🎯",
    },
  ],
  monthly: [
    {
      title: "Best Sector",
      value: "IT & Technology",
      change: "+₹1,85,000",
      icon: TrendingUp,
      emoji: "💻",
    },
    {
      title: "Optimal Position Size",
      value: "₹2,00,000 per trade",
      change: "65% Win Rate",
      icon: Target,
      emoji: "💰",
    },
    {
      title: "Best Trading Days",
      value: "Expiry Sessions",
      change: "78% Success",
      icon: Clock,
      emoji: "📅",
    },
  ],
  "3M": [
    {
      title: "Top Performing Sector",
      value: "Banking & Finance",
      change: "+₹3,25,000",
      icon: TrendingUp,
      emoji: "🏦",
    },
    {
      title: "Best Strategy",
      value: "Swing Trading",
      change: "70% Win Rate",
      icon: Target,
      emoji: "🔄",
    },
    {
      title: "Optimal Hold Period",
      value: "3-5 Days",
      change: "82% Success",
      icon: Clock,
      emoji: "⏱️",
    },
  ],
  "6M": [
    {
      title: "Best Market Cap",
      value: "Mid Cap Stocks",
      change: "+₹5,45,000",
      icon: TrendingUp,
      emoji: "📊",
    },
    {
      title: "Top Trading Style",
      value: "Momentum Trading",
      change: "75% Win Rate",
      icon: Target,
      emoji: "⚡",
    },
    {
      title: "Best Market Condition",
      value: "High Volatility",
      change: "80% Success",
      icon: Clock,
      emoji: "📈",
    },
  ],
  "1Y": [
    {
      title: "Top Asset Class",
      value: "Equity Options",
      change: "+₹12,50,000",
      icon: TrendingUp,
      emoji: "🔝",
    },
    {
      title: "Best Investment Style",
      value: "Value Investing",
      change: "68% Win Rate",
      icon: Target,
      emoji: "💵",
    },
    {
      title: "Optimal Portfolio Size",
      value: "12-15 Stocks",
      change: "85% Success",
      icon: Clock,
      emoji: "📂",
    },
  ],
}

export function ClientInsightsPage() {
  const [mounted, setMounted] = useState(false)
  const [timeframe, setTimeframe] = useState("weekly")
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [currentPatterns, setCurrentPatterns] = useState(tradingPatternsData.weekly)
  const [currentInsights, setCurrentInsights] = useState(insightsData.weekly)
  const [currentStats, setCurrentStats] = useState(marketStats.weekly)
  const [activeTab, setActiveTab] = useState("insights")

  useEffect(() => {
    setMounted(true)
    // Update data when timeframe changes
    setCurrentPatterns(tradingPatternsData[timeframe as keyof typeof tradingPatternsData] || tradingPatternsData.weekly)
    setCurrentInsights(insightsData[timeframe as keyof typeof insightsData] || insightsData.weekly)
    setCurrentStats(marketStats[timeframe as keyof typeof marketStats] || marketStats.weekly)
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
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <GradientText>Trading Insights</GradientText>
              <Brain className="h-5 w-5 text-purple-500" />
            </h1>
            <p className="text-muted-foreground">AI-powered analysis to help you make smarter trading decisions</p>
          </div>

          <SimpleNav activeTab={activeTab} />

          <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Performance Analysis</h2>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row sm:items-center">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="3M">3 Months</SelectItem>
                  <SelectItem value="6M">6 Months</SelectItem>
                  <SelectItem value="1Y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange date={date} setDate={setDate} className="w-full sm:w-auto" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentPatterns}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-sm font-medium text-muted-foreground" />
                      <YAxis className="text-sm font-medium text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      />
                      <Bar dataKey="wins" fill="hsl(var(--primary))" name="Profitable Trades" />
                      <Bar dataKey="losses" fill="hsl(var(--destructive))" name="Loss Making Trades" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Trading Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {currentStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                          <span className="text-lg">{stat.emoji}</span>
                        </div>
                        <div>
                          <div className="font-heading font-semibold">{stat.title}</div>
                          <p className="text-sm text-muted-foreground">{stat.value}</p>
                        </div>
                      </div>
                      <div className="text-right font-bold">{stat.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Trading Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentInsights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-md transition-all border-t-4 border-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="font-heading text-lg font-semibold flex items-center gap-2">
                        <span className="text-xl">{insight.emoji}</span>
                        {insight.title}
                      </CardTitle>
                      {insight.type === "warning" ? (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <Badge variant={insight.type === "warning" ? "destructive" : "default"} className="font-medium">
                        {insight.impact}
                      </Badge>
                      <p className="text-sm mt-4 text-muted-foreground">{insight.recommendation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

