"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { OEEChart } from "@/components/oee-chart"
import { KPICards } from "@/components/kpi-cards"
import { DataTable } from "@/components/data-table"
import { TemplateDownload } from "@/components/template-download"
import { SixBigLosses } from "@/components/six-big-losses"
import type { OEEData } from "@/lib/oee-types"

export function OEECalculator() {
  const [data, setData] = useState<OEEData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">OEE</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">OEE Calculator</h1>
          </div>
          <span className="text-sm text-muted-foreground">For SMEs</span>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Upload Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Upload Production Data</h2>
              <p className="text-sm text-muted-foreground">
                Upload your Excel or CSV file with 30 days of production data to analyze OEE
              </p>
            </div>
            <TemplateDownload />
          </div>
          <FileUploader onDataLoaded={setData} isLoading={isLoading} setIsLoading={setIsLoading} />
        </section>

        {/* Results Section */}
        {data.length > 0 && (
          <>
            {/* KPI Cards */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Min, Max, and Average values across {data.length} days of production data
              </p>
              <KPICards data={data} />
            </section>

            {/* Chart */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">OEE Trend Analysis ({data.length} Days)</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Track daily performance to identify patterns and anomalies
              </p>
              <OEEChart data={data} />
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Six Big Losses Analysis</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Understand which loss categories have the biggest impact on your OEE
              </p>
              <SixBigLosses data={data} />
            </section>

            {/* Data Table */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">Detailed Data</h2>
              <DataTable data={data} />
            </section>
          </>
        )}

        {/* Empty State */}
        {data.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No data uploaded yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Download the template, fill in your 30 days of production data, and upload it to see your OEE metrics and
              Six Big Losses analysis
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          OEE = Availability × Performance × Quality
        </div>
      </footer>
    </div>
  )
}
