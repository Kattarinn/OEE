import type { RawExcelRow, OEEData, SixBigLosses, OEEStatistics } from "./oee-types"

export function calculateOEE(rawData: RawExcelRow[]): OEEData[] {
  return rawData.map((row) => {
    const plannedTime = row["Planned Production Time (min)"]
    const plannedDowntime = row["Planned Downtime (min)"]
    const unplannedDowntime = row["Unplanned Downtime (min)"]
    const minorStopTime = row["Minor Stop Time (min)"]
    const operatingTime = row["Operating Time (min)"]
    const idealCycleTime = row["Ideal Cycle Time (s/unit)"]
    const actualCycleTime = row["Actual Cycle Time (s/unit)"]
    const minorStopsCount = row["Minor Stops (count/day)"]
    const totalOutput = row["Total Output (units)"]
    const goodOutput = row["Good Output (units)"]
    const defectiveOutput = row["Defective Output (units)"]

    // Use pre-calculated values if available, otherwise calculate
    let availability = row["Availability (%)"]
    let performance = row["Performance (%)"]
    let quality = row["Quality (%)"]
    let oee = row["OEE (%)"]

    if (availability === undefined) {
      // Availability = Operating Time / (Planned Time - Planned Downtime)
      const availableTime = plannedTime - plannedDowntime
      availability = (operatingTime / availableTime) * 100
    }

    if (performance === undefined) {
      // Performance = (Ideal Cycle Time × Total Output) / (Operating Time × 60)
      performance = ((idealCycleTime * totalOutput) / (operatingTime * 60)) * 100
    }

    if (quality === undefined) {
      // Quality = Good Output / Total Output
      quality = (goodOutput / totalOutput) * 100
    }

    if (oee === undefined) {
      // OEE = Availability × Performance × Quality
      oee = (availability / 100) * (performance / 100) * (quality / 100) * 100
    }

    return {
      day: row.Day,
      plannedTime,
      plannedDowntime,
      unplannedDowntime,
      minorStopTime,
      operatingTime,
      idealCycleTime,
      actualCycleTime,
      minorStopsCount,
      totalOutput,
      goodOutput,
      defectiveOutput,
      availability,
      performance,
      quality,
      oee,
    }
  })
}

export function calculateStatistics(values: number[]): OEEStatistics {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length
  return { min, max, avg }
}

export function calculateSixBigLosses(data: OEEData[]): SixBigLosses {
  const totalPlannedTime = data.reduce((sum, d) => sum + d.plannedTime, 0)

  // Availability Losses
  const totalUnplannedDowntime = data.reduce((sum, d) => sum + d.unplannedDowntime, 0)
  const totalPlannedDowntime = data.reduce((sum, d) => sum + d.plannedDowntime, 0)

  // Performance Losses
  const totalMinorStopTime = data.reduce((sum, d) => sum + d.minorStopTime, 0)
  const totalOperatingTime = data.reduce((sum, d) => sum + d.operatingTime, 0)
  const totalIdealTime = data.reduce((sum, d) => (d.idealCycleTime * d.totalOutput) / 60, 0)
  const speedLoss = totalOperatingTime - totalMinorStopTime - totalIdealTime

  // Quality Losses
  const totalDefects = data.reduce((sum, d) => sum + d.defectiveOutput, 0)
  const totalOutput = data.reduce((sum, d) => sum + d.totalOutput, 0)
  const avgIdealCycleTime = data.reduce((sum, d) => sum + d.idealCycleTime, 0) / data.length
  const defectTimeLoss = (totalDefects * avgIdealCycleTime) / 60

  return {
    availabilityLosses: {
      breakdowns: (totalUnplannedDowntime / totalPlannedTime) * 100,
      setupAndAdjustment: (totalPlannedDowntime / totalPlannedTime) * 100,
    },
    performanceLosses: {
      minorStops: (totalMinorStopTime / totalPlannedTime) * 100,
      reducedSpeed: Math.max(0, (speedLoss / totalPlannedTime) * 100),
    },
    qualityLosses: {
      defects: (totalDefects / totalOutput) * 100,
      startupLosses: Math.max(0, defectTimeLoss / totalPlannedTime) * 100,
    },
  }
}
