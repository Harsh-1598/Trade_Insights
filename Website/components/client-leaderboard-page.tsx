"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Target, Clock, TrendingUp, Award, Sparkles, Zap, Flame } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientText } from "@/components/ui/gradient-text"
import { MainNav } from "@/components/main-nav"
import { SimpleNav } from "@/components/simple-nav"

// Mock data for different time periods
const timePeriodsData = {
  daily: {
    achievements: [
      {
        title: "Highest Profit",
        trader: "Rajesh Sharma",
        value: "+45.8%",
        period: "Today",
        icon: TrendingUp,
        color: "from-yellow-500 to-yellow-600",
        emoji: "💰",
      },
      {
        title: "Best Win Rate",
        trader: "Priya Patel",
        value: "92%",
        period: "Today's Trades",
        icon: Target,
        color: "from-blue-500 to-blue-600",
        emoji: "🎯",
      },
      {
        title: "Most Consistent",
        trader: "Amit Kumar",
        value: "0.95",
        period: "Daily Sharpe",
        icon: Award,
        color: "from-purple-500 to-purple-600",
        emoji: "⚖️",
      },
      {
        title: "Risk Management",
        trader: "Neha Gupta",
        value: "1.2%",
        period: "Avg Risk per Trade",
        icon: Clock,
        color: "from-green-500 to-green-600",
        emoji: "🛡️",
      },
    ],
    traders: [
      {
        rank: 1,
        name: "Rajesh Sharma",
        profit: "+45.8%",
        winRate: "85%",
        avgHoldTime: "1.5h",
        successRate: "95%",
        bestHours: "10:30-11:30",
        riskReward: "1:3.5",
        trades: 25,
        badges: ["🏆 Day Trader", "📈 Options King", "⚡ Momentum Pro"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 2,
        name: "Priya Patel",
        profit: "+38.2%",
        winRate: "92%",
        avgHoldTime: "2.1h",
        successRate: "90%",
        bestHours: "9:15-10:30",
        riskReward: "1:3.0",
        trades: 18,
        badges: ["🎯 Precision Queen", "💫 Rising Star"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 3,
        name: "Amit Kumar",
        profit: "+32.5%",
        winRate: "80%",
        avgHoldTime: "1.8h",
        successRate: "88%",
        bestHours: "13:30-14:30",
        riskReward: "1:2.8",
        trades: 22,
        badges: ["🏅 Nifty Expert"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 4,
        name: "Neha Gupta",
        profit: "+28.3%",
        winRate: "78%",
        avgHoldTime: "1.2h",
        successRate: "85%",
        bestHours: "11:30-12:30",
        riskReward: "1:2.5",
        trades: 20,
        badges: ["⚖️ Risk Guru"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 5,
        name: "Suresh Iyer",
        profit: "+25.9%",
        winRate: "75%",
        avgHoldTime: "1.5h",
        successRate: "82%",
        bestHours: "10:30-11:30",
        riskReward: "1:2.3",
        trades: 15,
        badges: ["📊 Technical Master"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  weekly: {
    achievements: [
      {
        title: "Highest Profit",
        trader: "Rajesh Sharma",
        value: "+145.8%",
        period: "This Week",
        icon: TrendingUp,
        color: "from-yellow-500 to-yellow-600",
        emoji: "💰",
      },
      {
        title: "Best Win Rate",
        trader: "Priya Patel",
        value: "89%",
        period: "Weekly Trades",
        icon: Target,
        color: "from-blue-500 to-blue-600",
        emoji: "🎯",
      },
      {
        title: "Most Consistent",
        trader: "Amit Kumar",
        value: "0.92",
        period: "Weekly Sharpe",
        icon: Award,
        color: "from-purple-500 to-purple-600",
        emoji: "⚖️",
      },
      {
        title: "Risk Management",
        trader: "Neha Gupta",
        value: "1.5%",
        period: "Avg Risk per Trade",
        icon: Clock,
        color: "from-green-500 to-green-600",
        emoji: "🛡️",
      },
    ],
    traders: [
      {
        rank: 1,
        name: "Rajesh Sharma",
        profit: "+145.8%",
        winRate: "78%",
        avgHoldTime: "1.5d",
        successRate: "92%",
        bestHours: "10:30-14:30",
        riskReward: "1:3.2",
        trades: 45,
        badges: ["🏆 Master Trader", "📈 Options King", "⚡ Momentum Pro"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 2,
        name: "Priya Patel",
        profit: "+120.2%",
        winRate: "89%",
        avgHoldTime: "2.2d",
        successRate: "88%",
        bestHours: "9:15-11:30",
        riskReward: "1:2.8",
        trades: 39,
        badges: ["🎯 Precision Queen", "💫 Rising Star"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 3,
        name: "Amit Kumar",
        profit: "+105.5%",
        winRate: "72%",
        avgHoldTime: "1.8d",
        successRate: "85%",
        bestHours: "13:30-15:30",
        riskReward: "1:2.5",
        trades: 52,
        badges: ["🏅 Nifty Expert"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 4,
        name: "Neha Gupta",
        profit: "+92.3%",
        winRate: "75%",
        avgHoldTime: "1.2d",
        successRate: "82%",
        bestHours: "11:30-13:30",
        riskReward: "1:2.2",
        trades: 47,
        badges: ["⚖️ Risk Guru"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 5,
        name: "Suresh Iyer",
        profit: "+88.9%",
        winRate: "70%",
        avgHoldTime: "1.5d",
        successRate: "80%",
        bestHours: "10:30-12:30",
        riskReward: "1:2.1",
        trades: 45,
        badges: ["📊 Technical Master"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  monthly: {
    achievements: [
      {
        title: "Highest Profit",
        trader: "Rajesh Sharma",
        value: "+245.8%",
        period: "This Month",
        icon: TrendingUp,
        color: "from-yellow-500 to-yellow-600",
        emoji: "💰",
      },
      {
        title: "Best Win Rate",
        trader: "Priya Patel",
        value: "89%",
        period: "Last 100 Trades",
        icon: Target,
        color: "from-blue-500 to-blue-600",
        emoji: "🎯",
      },
      {
        title: "Most Consistent",
        trader: "Amit Kumar",
        value: "0.92",
        period: "Sharpe Ratio",
        icon: Award,
        color: "from-purple-500 to-purple-600",
        emoji: "⚖️",
      },
      {
        title: "Risk Management",
        trader: "Neha Gupta",
        value: "1.8%",
        period: "Avg Risk per Trade",
        icon: Clock,
        color: "from-green-500 to-green-600",
        emoji: "🛡️",
      },
    ],
    traders: [
      {
        rank: 1,
        name: "Rajesh Sharma",
        profit: "+245.8%",
        winRate: "78%",
        avgHoldTime: "2.5d",
        successRate: "92%",
        bestHours: "10:30-14:30",
        riskReward: "1:3.2",
        trades: 145,
        badges: ["🏆 Master Trader", "📈 Options King", "⚡ Momentum Pro"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 2,
        name: "Priya Patel",
        profit: "+180.2%",
        winRate: "89%",
        avgHoldTime: "5.2d",
        successRate: "88%",
        bestHours: "9:15-11:30",
        riskReward: "1:2.8",
        trades: 89,
        badges: ["🎯 Precision Queen", "💫 Rising Star"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 3,
        name: "Amit Kumar",
        profit: "+165.5%",
        winRate: "72%",
        avgHoldTime: "3.8d",
        successRate: "85%",
        bestHours: "13:30-15:30",
        riskReward: "1:2.5",
        trades: 212,
        badges: ["🏅 Nifty Expert"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 4,
        name: "Neha Gupta",
        profit: "+142.3%",
        winRate: "75%",
        avgHoldTime: "1.5d",
        successRate: "82%",
        bestHours: "11:30-13:30",
        riskReward: "1:2.2",
        trades: 167,
        badges: ["⚖️ Risk Guru"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 5,
        name: "Suresh Iyer",
        profit: "+138.9%",
        winRate: "70%",
        avgHoldTime: "4.1d",
        successRate: "80%",
        bestHours: "10:30-12:30",
        riskReward: "1:2.1",
        trades: 145,
        badges: ["📊 Technical Master"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  yearly: {
    achievements: [
      {
        title: "Highest Profit",
        trader: "Rajesh Sharma",
        value: "+345.8%",
        period: "This Year",
        icon: TrendingUp,
        color: "from-yellow-500 to-yellow-600",
        emoji: "💰",
      },
      {
        title: "Best Win Rate",
        trader: "Priya Patel",
        value: "87%",
        period: "Annual Trades",
        icon: Target,
        color: "from-blue-500 to-blue-600",
        emoji: "🎯",
      },
      {
        title: "Most Consistent",
        trader: "Amit Kumar",
        value: "0.95",
        period: "Annual Sharpe",
        icon: Award,
        color: "from-purple-500 to-purple-600",
        emoji: "⚖️",
      },
      {
        title: "Risk Management",
        trader: "Neha Gupta",
        value: "1.5%",
        period: "Avg Annual Risk",
        icon: Clock,
        color: "from-green-500 to-green-600",
        emoji: "🛡️",
      },
    ],
    traders: [
      {
        rank: 1,
        name: "Rajesh Sharma",
        profit: "+345.8%",
        winRate: "76%",
        avgHoldTime: "5.5d",
        successRate: "90%",
        bestHours: "10:30-14:30",
        riskReward: "1:3.5",
        trades: 345,
        badges: ["🏆 Master Trader", "📈 Options King", "⚡ Momentum Pro"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 2,
        name: "Priya Patel",
        profit: "+280.2%",
        winRate: "87%",
        avgHoldTime: "7.2d",
        successRate: "86%",
        bestHours: "9:15-11:30",
        riskReward: "1:3.0",
        trades: 289,
        badges: ["🎯 Precision Queen", "💫 Rising Star"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 3,
        name: "Amit Kumar",
        profit: "+265.5%",
        winRate: "70%",
        avgHoldTime: "6.8d",
        successRate: "83%",
        bestHours: "13:30-15:30",
        riskReward: "1:2.7",
        trades: 412,
        badges: ["🏅 Nifty Expert"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 4,
        name: "Neha Gupta",
        profit: "+242.3%",
        winRate: "73%",
        avgHoldTime: "4.5d",
        successRate: "80%",
        bestHours: "11:30-13:30",
        riskReward: "1:2.4",
        trades: 367,
        badges: ["⚖️ Risk Guru"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 5,
        name: "Suresh Iyer",
        profit: "+238.9%",
        winRate: "68%",
        avgHoldTime: "5.1d",
        successRate: "78%",
        bestHours: "10:30-12:30",
        riskReward: "1:2.3",
        trades: 345,
        badges: ["📊 Technical Master"],
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
}

export function ClientLeaderboardPage() {
  const [mounted, setMounted] = useState(false)
  const [timeframe, setTimeframe] = useState("monthly")
  const [metric, setMetric] = useState("profit")
  const [currentData, setCurrentData] = useState(timePeriodsData["monthly"])
  const [activeTab, setActiveTab] = useState("leaderboard")

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
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <GradientText>Leaderboard</GradientText>
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </h1>
            <p className="text-muted-foreground">
              See who's crushing it in the markets and learn from the best traders
            </p>
          </div>

          <SimpleNav activeTab={activeTab} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Top Performers</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(timePeriodsData).map((period) => (
                    <SelectItem key={period} value={period}>
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit">Total Profit</SelectItem>
                  <SelectItem value="winRate">Win Rate</SelectItem>
                  <SelectItem value="successRate">Success Rate</SelectItem>
                  <SelectItem value="riskReward">Risk/Reward</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {currentData.achievements.map((achievement, index) => (
              <Card key={index} className={`bg-gradient-to-br ${achievement.color} hover:shadow-lg transition-all`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white text-sm flex items-center gap-1">
                    <span>{achievement.emoji}</span>
                    {achievement.title}
                  </CardTitle>
                  <achievement.icon className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{achievement.trader}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">{achievement.value}</p>
                    <p className="text-sm text-white/75">{achievement.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="detailed" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Detailed Stats
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Trader</TableHead>
                        <TableHead className="text-right">Profit</TableHead>
                        <TableHead className="hidden md:table-cell">Win Rate</TableHead>
                        <TableHead className="hidden lg:table-cell">Success Rate</TableHead>
                        <TableHead className="hidden xl:table-cell">Badges</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.traders.map((trader) => (
                        <TableRow key={trader.rank} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {trader.rank === 1 ? (
                              <span className="flex items-center">
                                <Trophy className="h-5 w-5 text-yellow-500 mr-1" /> 1
                              </span>
                            ) : trader.rank === 2 ? (
                              <span className="flex items-center">
                                <Medal className="h-5 w-5 text-zinc-400 mr-1" /> 2
                              </span>
                            ) : trader.rank === 3 ? (
                              <span className="flex items-center">
                                <Medal className="h-5 w-5 text-orange-500 mr-1" /> 3
                              </span>
                            ) : (
                              trader.rank
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img
                                src={trader.avatar || "/placeholder.svg"}
                                alt={trader.name}
                                className="h-8 w-8 rounded-full"
                              />
                              {trader.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-green-500 font-semibold">{trader.profit}</TableCell>
                          <TableCell className="hidden md:table-cell">{trader.winRate}</TableCell>
                          <TableCell className="hidden lg:table-cell">{trader.successRate}</TableCell>
                          <TableCell className="hidden xl:table-cell">
                            <div className="flex flex-wrap gap-2">
                              {trader.badges.map((badge, index) => (
                                <Badge key={index} variant="secondary" className="animate-pulse">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="detailed">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Trader</TableHead>
                        <TableHead>Avg Hold Time</TableHead>
                        <TableHead>Best Hours</TableHead>
                        <TableHead>Risk/Reward</TableHead>
                        <TableHead className="hidden md:table-cell">Total Trades</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.traders.map((trader) => (
                        <TableRow key={trader.rank} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <img
                                src={trader.avatar || "/placeholder.svg"}
                                alt={trader.name}
                                className="h-8 w-8 rounded-full"
                              />
                              {trader.name}
                            </div>
                          </TableCell>
                          <TableCell>{trader.avgHoldTime}</TableCell>
                          <TableCell>{trader.bestHours}</TableCell>
                          <TableCell>{trader.riskReward}</TableCell>
                          <TableCell className="hidden md:table-cell">{trader.trades}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Achievement Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentData.traders.slice(0, 3).map((trader, index) => (
                  <Card key={index} className="hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                        {index === 1 && <Medal className="h-5 w-5 text-zinc-400" />}
                        {index === 2 && <Medal className="h-5 w-5 text-orange-500" />}
                        <CardTitle className="text-sm flex items-center gap-2">
                          <img
                            src={trader.avatar || "/placeholder.svg"}
                            alt={trader.name}
                            className="h-6 w-6 rounded-full"
                          />
                          {trader.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Win Rate</span>
                          <span className="font-medium">{trader.winRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Success Rate</span>
                          <span className="font-medium">{trader.successRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Risk/Reward</span>
                          <span className="font-medium">{trader.riskReward}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Best Hours</span>
                          <span className="font-medium">{trader.bestHours}</span>
                        </div>
                      </div>
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

