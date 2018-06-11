function convertToRgba(rgb, alpha) {
  return rgb.replace(/rgb/i, 'rgba').replace(/\)/i,`,${alpha})`)
}

export { convertToRgba }
