"use client"

import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"

export function TemplateDownload() {
  const downloadTemplate = () => {
    const templateData = [
      {
        Day: 1,
        "Planned Production Time (min)": 425,
        "Planned Downtime (min)": 38,
        "Unplanned Downtime (min)": 43,
        "Minor Stop Time (min)": 7.47,
        "Total Availability Loss (min)": 88.47,
        "Operating Time (min)": 336.53,
        "Ideal Cycle Time (s/unit)": 6.13,
        "Actual Cycle Time (s/unit)": 9.54,
        "Minor Stops (count/day)": 14,
        "Total Output (units)": 2117,
        "Good Output (units)": 2040,
        "Defective Output (units)": 77,
      },
      {
        Day: 2,
        "Planned Production Time (min)": 467,
        "Planned Downtime (min)": 29,
        "Unplanned Downtime (min)": 36,
        "Minor Stop Time (min)": 15.4,
        "Total Availability Loss (min)": 80.4,
        "Operating Time (min)": 386.6,
        "Ideal Cycle Time (s/unit)": 6.17,
        "Actual Cycle Time (s/unit)": 9.43,
        "Minor Stops (count/day)": 21,
        "Total Output (units)": 2459,
        "Good Output (units)": 2214,
        "Defective Output (units)": 245,
      },
      {
        Day: 3,
        "Planned Production Time (min)": 459,
        "Planned Downtime (min)": 23,
        "Unplanned Downtime (min)": 23,
        "Minor Stop Time (min)": 15.77,
        "Total Availability Loss (min)": 61.77,
        "Operating Time (min)": 397.23,
        "Ideal Cycle Time (s/unit)": 7.65,
        "Actual Cycle Time (s/unit)": 9.37,
        "Minor Stops (count/day)": 22,
        "Total Output (units)": 2542,
        "Good Output (units)": 2304,
        "Defective Output (units)": 238,
      },
    ]

    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Production Data")

    // Set column widths
    ws["!cols"] = [
      { wch: 6 },
      { wch: 28 },
      { wch: 22 },
      { wch: 24 },
      { wch: 20 },
      { wch: 26 },
      { wch: 20 },
      { wch: 22 },
      { wch: 22 },
      { wch: 22 },
      { wch: 20 },
      { wch: 20 },
      { wch: 22 },
    ]

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "oee-template.xlsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" onClick={downloadTemplate} className="gap-2 bg-transparent">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Template
    </Button>
  )
}
