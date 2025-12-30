"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { OEEData } from "@/lib/oee-types"
import { calculateStatistics } from "@/lib/oee-calculations"

interface KPICardsProps {
  data: OEEData[]
}

export function KPICards({ data }: KPICardsProps) {
  const oeeStats = calculateStatistics(data.map((d) => d.oee))
  const availabilityStats = calculateStatistics(data.map((d) => d.availability))
  const performanceStats = calculateStatistics(data.map((d) => d.performance))
  const qualityStats = calculateStatistics(data.map((d) => d.quality))

  const kpis = [
    {
      label: "Overall OEE",
      stats: oeeStats,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500",
      bgLight: "bg-emerald-100",
    },
    {
      label: "Availability",
      stats: availabilityStats,
      color: "text-blue-600",
      bgColor: "bg-blue-500",
      bgLight: "bg-blue-100",
    },
    {
      label: "Performance",
      stats: performanceStats,
      color: "text-amber-600",
      bgColor: "bg-amber-500",
      bgLight: "bg-amber-100",
    },
    {
      label: "Quality",
      stats: qualityStats,
      color: "text-violet-600",
      bgColor: "bg-violet-500",
      bgLight: "bg-violet-100",
    },
  ]

  const getStatus = (value: number) => {
    if (value >= 85) return { text: "Excellent", class: "bg-emerald-100 text-emerald-700" }
    if (value >= 60) return { text: "Good", class: "bg-amber-100 text-amber-700" }
    return { text: "Needs Improvement", class: "bg-red-100 text-red-700" }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const status = getStatus(kpi.stats.avg)
        return (
          <Card key={kpi.label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${status.class}`}>{status.text}</span>
              </div>
              <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.stats.avg.toFixed(1)}%</div>
              <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  Min: <span className="font-medium text-foreground">{kpi.stats.min.toFixed(1)}%</span>
                </span>
                <span>
                  Max: <span className="font-medium text-foreground">{kpi.stats.max.toFixed(1)}%</span>
                </span>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${kpi.bgColor}`}
                  style={{ width: `${Math.min(kpi.stats.avg, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
