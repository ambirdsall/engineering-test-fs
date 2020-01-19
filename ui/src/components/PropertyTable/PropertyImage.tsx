import React, { useState } from "react";
import usePropertyImageUrl from "../../hooks/usePropertyImageUrl";

type PropertyImageProps = {
  propertyId: string;
  height?: number;
};

const PropertyImage = ({ propertyId, height }: PropertyImageProps) => {
  const imageUrl = usePropertyImageUrl(propertyId);
  const imageWithOverlaysUrl = usePropertyImageUrl(propertyId, {
    withOverlays: true
  });
  const [url, setUrl] = useState(imageUrl);
  const maxHeight = height || 100;

  return imageUrl ? (
    <img
      style={{ maxHeight }}
      src={url}
      alt="overhead shot of property"
      onMouseEnter={() => setUrl(imageWithOverlaysUrl)}
      onMouseLeave={() => setUrl(imageUrl)}
    />
  ) : (
    <img
      style={{ maxHeight }}
      src={`http://placekitten.com/${maxHeight}/${maxHeight}`}
      alt=""
    />
  );
};

export default PropertyImage;
