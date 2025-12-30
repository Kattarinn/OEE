export interface RawExcelRow {
  Day: number
  "Planned Production Time (min)": number
  "Planned Downtime (min)": number
  "Unplanned Downtime (min)": number
  "Minor Stop Time (min)": number
  "Total Availability Loss (min)": number
  "Operating Time (min)": number
  "Ideal Cycle Time (s/unit)": number
  "Actual Cycle Time (s/unit)": number
  "Minor Stops (count/day)": number
  "Moisture-Variance Indicator"?: number
  "Temperature-Load Indicator"?: number
  "Total Output (units)": number
  "Good Output (units)": number
  "Defective Output (units)": number
  "Availability (%)"?: number
  "Performance (%)"?: number
  "Quality (%)"?: number
  "OEE (%)"?: number
}

export interface OEEData {
  day: number
  plannedTime: number
  plannedDowntime: number
  unplannedDowntime: number
  minorStopTime: number
  operatingTime: number
  idealCycleTime: number
  actualCycleTime: number
  minorStopsCount: number
  totalOutput: number
  goodOutput: number
  defectiveOutput: number
  availability: number
  performance: number
  quality: number
  oee: number
}

export interface SixBigLosses {
  availabilityLosses: {
    breakdowns: number
    setupAndAdjustment: number
  }
  performanceLosses: {
    minorStops: number
    reducedSpeed: number
  }
  qualityLosses: {
    defects: number
    startupLosses: number
  }
}

export interface OEEStatistics {
  min: number
  max: number
  avg: number
}
