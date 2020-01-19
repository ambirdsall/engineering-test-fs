import { useState, useEffect } from "react";
import { Get } from "../api";

const usePropertyImage = (propertyId: string) => {
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    Get("/display/" + propertyId)
      .then(img => img.blob().then(setImage))
      .catch(console.error);
  }, [propertyId]);

  return image;
};

export default usePropertyImage;
