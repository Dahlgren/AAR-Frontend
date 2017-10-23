const SIDES = {
  west: '#1E90FF',
  east: '#DC143C',
  guer: '#00CD00',
  civ: '#EEEE00'
}

export function projectileColor (side) {
  if (SIDES[side.toLowerCase()]) {
    return SIDES[side.toLowerCase()]
  }

  return SIDES.civ
}
