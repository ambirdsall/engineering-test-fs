import React, { useState, useCallback } from "react";
import usePropertyImageUrl from "../../hooks/usePropertyImageUrl";

type PropertyImageProps = {
  propertyId: string;
  height?: number;
};

const PropertyImage = ({ propertyId, height }: PropertyImageProps) => {
  const maxHeight = height || 100;
  const imageUrl = usePropertyImageUrl(propertyId);
  const imageWithOverlaysUrl = usePropertyImageUrl(propertyId, {
    withOverlays: true
  });
  const [url, setUrl] = useState(imageUrl);
  const setOverlaysImage = useCallback(() => setUrl(imageWithOverlaysUrl), [
    imageWithOverlaysUrl
  ]);
  const setBareImage = useCallback(() => setUrl(imageUrl), [imageUrl]);

  return imageUrl ? (
    <img
      style={{ maxHeight }}
      src={url || imageUrl}
      alt="overhead shot of property"
      onMouseEnter={setOverlaysImage}
      onMouseLeave={setBareImage}
    />
  ) : (
    // TODO: use an actual loading spinner instead
    <img
      style={{ maxHeight }}
      src={`http://placekitten.com/${maxHeight}/${maxHeight}`}
      alt=""
    />
  );
};

export default PropertyImage;
