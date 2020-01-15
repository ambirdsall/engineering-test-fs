import React, { useState, useEffect } from "react";
import { Get } from "../../api";

import classes from "./PropertyImage.module.css";

type PropertyImageProps = {
  propertyId: string;
};

const PropertyImage = ({ propertyId }: PropertyImageProps) => {
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    Get("/display/" + propertyId)
      .then(img => img.blob().then(setImage))
      .catch(console.error);
  }, [propertyId]);

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
