import React from "react";
import usePropertyImage from "../../hooks/usePropertyImage";

import classes from "./PropertyImage.module.css";

type PropertyImageProps = {
  propertyId: string;
};

const PropertyImage = ({ propertyId }: PropertyImageProps) => {
  const image = usePropertyImage(propertyId);

  return image ? (
    <img
      className={classes.Image}
      src={URL.createObjectURL(image)}
      alt="overhead shot of property"
    />
  ) : (
    <img
      className={classes.Image}
      src="http://placekitten.com/100/100"
      alt=""
    />
  );
};

export default PropertyImage;
