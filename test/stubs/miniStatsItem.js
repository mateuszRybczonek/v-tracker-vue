const miniStatsItem = {
  change: 0,
  color: 'black',
  customClass: 'mini-stats__item--fo',
  description: 'Fuel Oil',
  header: '90',
  icon: 'IconFuel',
  unit: 'cbm'
}

const miniStatsItemWithFreeSpace = {
  change: 0,
  color: 'black',
  customClass: 'mini-stats__item--fo',
  description: 'Fuel Oil',
  header: '90',
  icon: 'IconFuel',
  unit: 'cbm',
  freeSpace: 90
}

const miniStatsItemWithPositiveChange = {
  change: 10,
  color: 'black',
  customClass: 'mini-stats__item--fo',
  description: 'Fuel Oil',
  header: '90',
  icon: 'IconFuel',
  unit: 'cbm',
  freeSpace: 90
}

const miniStatsItemWithNegativeChange = {
  change: -10,
  color: 'black',
  customClass: 'mini-stats__item--fo',
  description: 'Fuel Oil',
  header: '90',
  icon: 'IconFuel',
  unit: 'cbm',
  freeSpace: 90
}

export {
  miniStatsItem,
  miniStatsItemWithFreeSpace,
  miniStatsItemWithPositiveChange,
  miniStatsItemWithNegativeChange
}
