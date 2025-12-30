"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import type { OEEData } from "@/lib/oee-types"

interface DataTableProps {
  data: OEEData[]
}

export function DataTable({ data }: DataTableProps) {
  const getCellColor = (value: number) => {
    if (value >= 85) return "text-green-600"
    if (value >= 60) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead className="text-right">Planned (min)</TableHead>
                <TableHead className="text-right">Operating (min)</TableHead>
                <TableHead className="text-right">Downtime (min)</TableHead>
                <TableHead className="text-right">Total Output</TableHead>
                <TableHead className="text-right">Good Output</TableHead>
                <TableHead className="text-right">Defects</TableHead>
                <TableHead className="text-right">Availability</TableHead>
                <TableHead className="text-right">Performance</TableHead>
                <TableHead className="text-right">Quality</TableHead>
                <TableHead className="text-right">OEE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">Day {row.day}</TableCell>
                  <TableCell className="text-right">{row.plannedTime.toFixed(0)}</TableCell>
                  <TableCell className="text-right">{row.operatingTime.toFixed(0)}</TableCell>
                  <TableCell className="text-right">
                    {(row.unplannedDowntime + row.plannedDowntime).toFixed(0)}
                  </TableCell>
                  <TableCell className="text-right">{row.totalOutput}</TableCell>
                  <TableCell className="text-right">{row.goodOutput}</TableCell>
                  <TableCell className="text-right text-red-600">{row.defectiveOutput}</TableCell>
                  <TableCell className={`text-right font-medium ${getCellColor(row.availability)}`}>
                    {row.availability.toFixed(1)}%
                  </TableCell>
                  <TableCell className={`text-right font-medium ${getCellColor(row.performance)}`}>
                    {row.performance.toFixed(1)}%
                  </TableCell>
                  <TableCell className={`text-right font-medium ${getCellColor(row.quality)}`}>
                    {row.quality.toFixed(1)}%
                  </TableCell>
                  <TableCell className={`text-right font-bold ${getCellColor(row.oee)}`}>
                    {row.oee.toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
