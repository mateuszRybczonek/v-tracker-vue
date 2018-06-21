const firstVessel = {
  flag: 'Marshall Islands',
  gt: '47000',
  id: '1',
  imoNumber: '123456789',
  mmsi: '987654321',
  name: 'ENSCO DS-2',
  owner: 'o1',
  owners: {
    'o1': true
  },
  reports: {
    'r1': true,
    'r2': true
  },
  yob: '1997',
  maxFo: '0',
  maxDo: '650',
  maxFw: '660',
  lastReport: {
    id: 1,
    reportTime: '2018-06-20',
    course: 300,
    doRob: 200,
    foRob: 100,
    fwRob: 50,
    lat: 12.3,
    lng: 30.4,
    pitch: 1,
    roll: 2,
    pob: 14,
    seaState: 4,
    spd: 12,
    swellDir: 230,
    swellHeight: 4,
    windDir: 210,
    windSpd: 20
  }
}

const secondVessel = {
  flag: 'Poland',
  gt: '45000',
  id: '2',
  imoNumber: '987654321',
  mmsi: '987654324',
  name: 'ENSCO DS-8',
  owner: 'o2',
  owners: {
    'o2': true
  },
  reports: {
    'r3': true,
    'r4': true
  },
  yob: '2013',
  maxFo: '0',
  maxDo: '650',
  maxFw: '660',
  lastReport: {
    id: 2,
    reportTime: '2018-06-10',
    course: 300,
    doRob: 200,
    foRob: 100,
    fwRob: 50,
    lat: 12.3,
    lng: 30.4,
    pitch: 1,
    roll: 2,
    pob: 14,
    seaState: 4,
    spd: 12,
    swellDir: 230,
    swellHeight: 4,
    windDir: 210,
    windSpd: 20
  }
}

const vesselCapacities = {
  maxDo: 650,
  maxFo: 0,
  maxFw: 660
}

export { firstVessel, secondVessel, vesselCapacities }
