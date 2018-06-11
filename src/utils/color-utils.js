function convertToRgba(rgb, alpha) {
  if (alpha >= 0 && alpha <= 1 ) return rgb.replace(/rgb/i, 'rgba').replace(/\)/i,`,${alpha})`)
  return false
}

export { convertToRgba }
