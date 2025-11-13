// 
"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({ day, isHeader }) => {
  const randomBgWhite =
    !isHeader && Math.random() < 0.3 ? "bg-indigo-500 text-white " : "text-gray-600 dark:text-gray-400"

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "" : "rounded-xl"
      } ${randomBgWhite}`}
    >
      <span className={`font-medium ${isHeader ? "text-xs" : "text-sm"}`}>{day}</span>
    </div>
  )
}

export function Calendar() {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()

  const bookingLink = `https://cal.com/aliimam/designali`

  const renderCalendarDays = () => {
    const days: React.ReactNode[] = [
      ...dayNames.map((day, i) => <CalendarDay key={`header-${day}`} day={day} isHeader />),
      ...Array(firstDayOfWeek).map((_, i) => (
        <div key={`empty-start-${i}`} className="col-span-1 row-span-1 h-8 w-8" />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => <CalendarDay key={`date-${i + 1}`} day={i + 1} />),
    ]

    return days
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white mb-2">Any questions about Design?</h2>
        <p className="text-sm text-gray-400 mb-3">Feel free to reach out to me!</p>
        <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700">Book Now</Button>
      </div>
      <div className="flex-1">
        <div className="rounded-2xl border border-gray-700 p-3 bg-gray-900/50">
          <div className="flex items-center space-x-2 mb-4">
            <p className="text-sm text-white">
              <span className="font-medium">
                {currentMonth}, {currentYear}
              </span>
            </p>
            <span className="h-1 w-1 rounded-full bg-gray-500">&nbsp;</span>
            <p className="text-xs text-gray-400">30 min call</p>
          </div>
          <div className="grid grid-cols-7 grid-rows-6 gap-2">{renderCalendarDays()}</div>
        </div>
      </div>
    </div>
  )
}
