"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OEEData } from "@/lib/oee-types"
import { calculateSixBigLosses } from "@/lib/oee-calculations"

interface SixBigLossesProps {
  data: OEEData[]
}

export function SixBigLosses({ data }: SixBigLossesProps) {
  const losses = calculateSixBigLosses(data)

  const lossCategories = [
    {
      title: "Availability Losses",
      description: "Time losses that reduce equipment running time",
      color: "text-blue-600",
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-50",
      items: [
        {
          name: "Equipment Breakdowns",
          value: losses.availabilityLosses.breakdowns,
          description: "Unplanned equipment failures and repairs",
        },
        {
          name: "Setup & Adjustments",
          value: losses.availabilityLosses.setupAndAdjustment,
          description: "Planned downtime for changeovers and cleaning",
        },
      ],
    },
    {
      title: "Performance Losses",
      description: "Speed losses that reduce production rate",
      color: "text-amber-600",
      borderColor: "border-l-amber-500",
      bgColor: "bg-amber-50",
      items: [
        {
          name: "Minor Stops",
          value: losses.performanceLosses.minorStops,
          description: "Brief interruptions and idling time",
        },
        {
          name: "Reduced Speed",
          value: losses.performanceLosses.reducedSpeed,
          description: "Running slower than ideal cycle time",
        },
      ],
    },
    {
      title: "Quality Losses",
      description: "Output losses due to defects",
      color: "text-violet-600",
      borderColor: "border-l-violet-500",
      bgColor: "bg-violet-50",
      items: [
        {
          name: "Production Defects",
          value: losses.qualityLosses.defects,
          description: "Rejected products during normal production",
        },
        {
          name: "Startup Losses",
          value: losses.qualityLosses.startupLosses,
          description: "Defects from startup until stable production",
        },
      ],
    },
  ]

  // Calculate total losses for impact ranking
  const allLosses = [
    { name: "Breakdowns", value: losses.availabilityLosses.breakdowns, category: "Availability" },
    { name: "Setup & Adjustments", value: losses.availabilityLosses.setupAndAdjustment, category: "Availability" },
    { name: "Minor Stops", value: losses.performanceLosses.minorStops, category: "Performance" },
    { name: "Reduced Speed", value: losses.performanceLosses.reducedSpeed, category: "Performance" },
    { name: "Defects", value: losses.qualityLosses.defects, category: "Quality" },
    { name: "Startup Losses", value: losses.qualityLosses.startupLosses, category: "Quality" },
  ].sort((a, b) => b.value - a.value)

  const topLoss = allLosses[0]

  return (
    <div className="space-y-6">
      {/* Impact Summary */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Biggest Impact on OEE</h3>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium text-red-600">{topLoss.name}</span> ({topLoss.category} Loss) is your
                largest loss at <span className="font-medium">{topLoss.value.toFixed(2)}%</span> of planned production
                time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loss Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {lossCategories.map((category) => (
          <Card key={category.title} className={`border-l-4 ${category.borderColor}`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-base ${category.color}`}>{category.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.items.map((item) => (
                <div key={item.name} className={`p-3 rounded-lg ${category.bgColor}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className={`text-sm font-bold ${category.color}`}>{item.value.toFixed(2)}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
