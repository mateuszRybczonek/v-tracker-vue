function decimalToDMS (decimal, latitude = true, degrees = 0, minutes = 0, seconds = 0, direction = 'X') {
  if (latitude && decimal < 0) {
    direction = 'S'
  } else if (!latitude && decimal < 0) {
    direction = 'W'
  } else if (!latitude) {
    direction = 'E'
  } else {
    direction = 'N'
  }

  const d = Math.abs(decimal)
  degrees = Math.floor(d)

  seconds = (d - degrees) * 3600

  minutes = (Math.round(seconds / 60 * 10) / 10).toFixed(1)

  let formattedDegree = null

  if (latitude) {
    formattedDegree = `${('0' + degrees).slice(-2)}${String.fromCharCode(176)}`
  } else {
    formattedDegree = `${('00' + degrees).slice(-3)}${String.fromCharCode(176)}`
  }

  const formattedMinutes = `${('0' + minutes).slice(-4)}'`

  return `${formattedDegree} ${formattedMinutes} ${direction}`
}

function distanceBetweenPoints (depLat, depLng, arrLat, arrLng) {
  const R = 6371e3
  const lat1 = toRadians(depLat)
  const lat2 = toRadians(arrLat)
  const dlat = toRadians(arrLat - depLat)
  const dlng = toRadians(arrLng - depLng)

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dlng / 2) * Math.sin(dlng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return (R * c / 1852).toFixed(0)
}

function formatLatForPersistanceLayer (lat) {
  const latArray = lat.split(' ')
  if (latArray[2] === 'S') {
    return (-Number(latArray[0]) - Number(latArray[1] / 60)).toFixed(3)
  } else {
    return (Number(latArray[0]) + Number(latArray[1] / 60)).toFixed(3)
  }
}

function formatLngForPersistanceLayer (lng) {
  const lngArray = lng.split(' ')
  if (lngArray[2] === 'W') {
    return (-Number(lngArray[0]) - Number(lngArray[1] / 60)).toFixed(3)
  } else {
    return (Number(lngArray[0]) + Number(lngArray[1] / 60)).toFixed(3)
  }
}

function stripSymbols (coordinate) {
  return coordinate.replace(String.fromCharCode(176), '').replace("'", '')
}

function toRadians (value) {
  return value * Math.PI / 180
}

export { decimalToDMS, distanceBetweenPoints, formatLatForPersistanceLayer, formatLngForPersistanceLayer, stripSymbols }
