"use client"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

interface DatePickerWithRangeProps {
  className?: string
  date: DateRange
  setDate: (date: DateRange) => void
}

export function DatePickerWithRange({ className, date, setDate }: DatePickerWithRangeProps) {
  const [quickSelect, setQuickSelect] = useState("custom")
  const [isOpen, setIsOpen] = useState(false)

  // Update quick select when date changes
  useEffect(() => {
    // Reset quick select when custom date is selected
    setQuickSelect("custom")
  }, [date])

  // Handle quick select changes
  const handleQuickSelectChange = (value: string) => {
    setQuickSelect(value)
    const today = new Date()

    switch (value) {
      case "today":
        setDate({ from: today, to: today })
        break
      case "yesterday":
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        setDate({ from: yesterday, to: yesterday })
        break
      case "thisWeek":
        const thisWeekStart = new Date()
        thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay())
        setDate({ from: thisWeekStart, to: today })
        break
      case "lastWeek":
        const lastWeekStart = new Date()
        lastWeekStart.setDate(lastWeekStart.getDate() - lastWeekStart.getDay() - 7)
        const lastWeekEnd = new Date()
        lastWeekEnd.setDate(lastWeekEnd.getDate() - lastWeekEnd.getDay() - 1)
        setDate({ from: lastWeekStart, to: lastWeekEnd })
        break
      case "thisMonth":
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
        setDate({ from: thisMonthStart, to: today })
        break
      case "lastMonth":
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
        setDate({ from: lastMonthStart, to: lastMonthEnd })
        break
      case "custom":
        // Do nothing, let the calendar handle it
        break
    }

    if (value !== "custom") {
      setIsOpen(false)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-3 border-b">
            <Select value={quickSelect} onValueChange={handleQuickSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Quick select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Range 📅</SelectItem>
                <SelectItem value="today">Today 📌</SelectItem>
                <SelectItem value="yesterday">Yesterday ⏪</SelectItem>
                <SelectItem value="thisWeek">This Week 🗓️</SelectItem>
                <SelectItem value="lastWeek">Last Week ⏮️</SelectItem>
                <SelectItem value="thisMonth">This Month 📆</SelectItem>
                <SelectItem value="lastMonth">Last Month 🔙</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

