"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { OEEData, RawExcelRow } from "@/lib/oee-types"
import { calculateOEE } from "@/lib/oee-calculations"

interface FileUploaderProps {
  onDataLoaded: (data: OEEData[]) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function FileUploader({ onDataLoaded, isLoading, setIsLoading }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsLoading(true)

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json<RawExcelRow>(worksheet)

          const processedData = calculateOEE(jsonData)
          onDataLoaded(processedData)
        } catch (error) {
          console.error("Error processing file:", error)
          alert("Error processing file. Please ensure it matches the template format.")
        } finally {
          setIsLoading(false)
        }
      }
      reader.readAsBinaryString(file)
    },
    [onDataLoaded, setIsLoading],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  })

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
        isLoading && "opacity-50 pointer-events-none",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          {isLoading ? (
            <svg className="w-6 h-6 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Processing file...</p>
        ) : isDragActive ? (
          <p className="text-sm text-primary font-medium">Drop the file here</p>
        ) : (
          <>
            <p className="text-sm text-foreground font-medium">Drag and drop your file here, or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports .xlsx, .xls, and .csv files</p>
          </>
        )}
      </div>
    </Card>
  )
}
