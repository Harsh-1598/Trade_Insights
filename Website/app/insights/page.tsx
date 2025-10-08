"use client"

import { Suspense } from "react"
import { TrendingUp, Clock, Target } from "lucide-react"
import { ClientInsightsPage } from "@/components/client-insights-page"
import { LoadingState } from "@/components/loading-state"

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
    },
    {
      title: "Options Trading",
      description: "Put options trades showing higher profitability",
      impact: "+35% Higher Returns",
      recommendation: "Consider increasing put options allocation",
      type: "success",
    },
  ],
  monthly: [
    {
      title: "Sector Analysis",
      description: "IT sector trades yielded highest returns this month",
      impact: "+₹1,45,000 Sector Profit",
      recommendation: "Monitor IT sector momentum",
      type: "success",
    },
    {
      title: "Risk Management",
      description: "Stop-loss adherence improved to 95%",
      impact: "Reduced Drawdown",
      recommendation: "Maintain current risk management strategy",
      type: "success",
    },
  ],
  "3M": [
    {
      title: "Portfolio Diversification",
      description: "Balanced exposure across sectors showing results",
      impact: "18% Lower Volatility",
      recommendation: "Continue sector rotation strategy",
      type: "success",
    },
    {
      title: "Trading Volume",
      description: "Increased trading activity in mid-cap stocks",
      impact: "+28% Returns in Mid-caps",
      recommendation: "Focus on mid-cap opportunities",
      type: "success",
    },
  ],
  "6M": [
    {
      title: "Strategy Performance",
      description: "Momentum strategy outperforming other approaches",
      impact: "+42% Strategy Returns",
      recommendation: "Increase allocation to momentum strategy",
      type: "success",
    },
    {
      title: "Market Correlation",
      description: "Portfolio shows low correlation with Nifty",
      impact: "0.3 Correlation Coefficient",
      recommendation: "Maintain diversification approach",
      type: "success",
    },
  ],
  "1Y": [
    {
      title: "Annual Performance",
      description: "Consistent alpha generation across market conditions",
      impact: "+15% Above Benchmark",
      recommendation: "Continue current strategic approach",
      type: "success",
    },
    {
      title: "Risk-Adjusted Returns",
      description: "Sharpe ratio improved significantly",
      impact: "1.8 Sharpe Ratio",
      recommendation: "Maintain risk-adjusted focus",
      type: "success",
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
    },
    {
      title: "Best Trading Session",
      value: "Morning (9:15-11:30)",
      change: "72% Win Rate",
      icon: Clock,
    },
    {
      title: "Top Strategy",
      value: "Gap Trading",
      change: "85% Success",
      icon: Target,
    },
  ],
  monthly: [
    {
      title: "Best Sector",
      value: "IT & Technology",
      change: "+₹1,85,000",
      icon: TrendingUp,
    },
    {
      title: "Optimal Position Size",
      value: "₹2,00,000 per trade",
      change: "65% Win Rate",
      icon: Target,
    },
    {
      title: "Best Trading Days",
      value: "Expiry Sessions",
      change: "78% Success",
      icon: Clock,
    },
  ],
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ClientInsightsPage />
    </Suspense>
  )
}

