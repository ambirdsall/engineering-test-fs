export type Property = {
  propertyId: string,
  coordinates: [number, number],
  isHighlighted?: boolean,
}

export type Statistics = {
  building_area_sqm: number[],
  parcel_area_sqm: number,
  zone_density: number[],
  building_distances_m: number[],
}
