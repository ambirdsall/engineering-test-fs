import React from "react";
import usePropertyImage from "../../hooks/usePropertyImage";

type PropertyImageProps = {
  propertyId: string;
  maxHeight?: number;
};

const PropertyImage = ({ propertyId, maxHeight }: PropertyImageProps) => {
  const image = usePropertyImage(propertyId);

  return image ? (
    <img
      style={{ maxHeight: maxHeight || 100 }}
      src={URL.createObjectURL(image)}
      alt="overhead shot of property"
    />
  ) : (
    <img
      style={{ maxHeight: maxHeight || 100 }}
      src="http://placekitten.com/100/100"
      alt=""
    />
  );
};

export default PropertyImage;
