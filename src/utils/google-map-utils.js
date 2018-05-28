function mapReportsToMarkers(reports) {
  return reports.map(report => {
    return {
      id: report.id,
      reportTime: report.reportTime,
      position: {
        lat: report.lat,
        lng: report.lng
      }
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

function slowPanTo(map, endPosition, numberOfIntervals, duration) {
  const getStep = delta => parseFloat(delta) / numberOfIntervals

  const startPosition = map.getCenter()
  const latDelta = endPosition.lat() - startPosition.lat()
  const lngDelta = endPosition.lng() - startPosition.lng()
  const latStep = getStep(latDelta)
  const lngStep = getStep(lngDelta)
  const latArray = []
  const lngArray = []

  for (let i = 1; i <= numberOfIntervals; i++) {
    latArray.push(map.getCenter().lat() + i * latStep);
    lngArray.push(map.getCenter().lng() + i * lngStep);
  }

  const timeout = parseFloat(duration) / numberOfIntervals

  const pan = i => {
    if (i < latArray.length) {
      return setTimeout(() => {
        map.panTo(new google.maps.LatLng({
          lat: latArray[i],
          lng: lngArray[i]
        }))
        return pan(i + 1)
      }, timeout)
    }
  }
  return pan(0)
}

export {
  mapReportsToMarkers,
  mapReportsToLines,
  slowPanTo
}
