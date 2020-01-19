import { useState, useEffect } from "react";
import { Get } from "../api";

const usePropertyImageUrl = (
  propertyId: string,
  options?: Partial<{ withOverlays: boolean }>
) => {
  const withOverlays = options && options.withOverlays;
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    Get(
      `/display/${propertyId}${
        withOverlays ? "?overlay=yes&building=green&parcel=orange" : ""
      }`
    )
      .then(img => img.blob().then(setImage))
      .catch(console.error);
  }, [propertyId]);

  return image ? URL.createObjectURL(image) : "";
};

export default usePropertyImageUrl;
