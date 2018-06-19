function mapReportsToMarkers(reports) {
  return reports.map(report => {
    return {
      id: report.id,
      reportTime: report.reportTime,
      position: {
        lat: report.lat,
        lng: report.lng
      },
      vesselName: report.vesselName || '-'
    }
  })
}

function mapReportsToLines(reports, linesArray) {
  reports.forEach((report, index) => {
    const nextReport = reports[index + 1]

    if (nextReport === undefined) return

    const depLat = report.lat
    const depLng = report.lng
    const arrLat = nextReport.lat
    const arrLng = nextReport.lng

    linesArray.push({
      path: [
        { lat: depLat, lng: depLng },
        { lat: arrLat, lng: arrLng },
      ]
    })
  })

  return linesArray
}

export {
  mapReportsToMarkers,
  mapReportsToLines
}
