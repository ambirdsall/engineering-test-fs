export type Coordinates = {
  lat: number;
  lng: number;
}

export type Bounds = {
  nw: Coordinates;
  se: Coordinates;
}

type Size = {
  width: number;
  height: number;
}

type MapConfig = {
  center: Coordinates;
  zoom: number;
}

declare module "*"
