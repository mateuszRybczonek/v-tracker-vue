function mapReportForStore (report) {
  report.course = parseInt(report.course)
  report.doRob = parseInt(report.doRob)
  report.foRob = parseInt(report.foRob)
  report.fwRob = parseInt(report.fwRob)
  report.lat = parseFloat(report.lat)
  report.lng = parseFloat(report.lng)
  report.pitch = parseFloat(report.pitch)
  report.roll = parseFloat(report.roll)
  report.pob = parseInt(report.pob)
  report.seaState = parseInt(report.seaState)
  report.spd = parseInt(report.spd)
  report.swellDir = parseInt(report.swellDir)
  report.swellHeight = parseFloat(report.swellHeight)
  report.windDir = parseInt(report.windDir)
  report.windSpd = parseInt(report.windSpd)
}

function getLastReport (reports) {
  const sortedReports = reports.sort((a, b) => a.reportTime > b.reportTime)
  return sortedReports.slice(-1)[0]
}

export { mapReportForStore, getLastReport }
