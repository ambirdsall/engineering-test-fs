import { Post, Get } from "../../api";
import { Property } from "../../domain/property";

export const getPropertiesInArea = (coordinates: [number, number], radius: number): Promise<Property[]> => {
  return Post("/find", {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates
    },
    "x-distance": radius
  }).catch(console.error);
}

export const getPropertyImage = (propertyId: string) => {
  return Get("/display/" + propertyId).catch(console.error);
}
