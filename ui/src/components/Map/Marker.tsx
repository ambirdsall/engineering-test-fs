import React, { useCallback, useState } from "react";
import { Tooltip } from "@material-ui/core";
import { Property } from "../../domain/property";

import classes from "./Marker.module.css";

type Props = {
  property: Property;
  setHighlighted: Function;
  [key: string]: any;
};
const Marker: React.FC<Props> = ({ property, setHighlighted, ...rest }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onMouseEnter = useCallback(() => setHighlighted(property.propertyId), [
    setHighlighted,
    property
  ]);
  const onMouseLeave = useCallback(() => {
    setHighlighted("");
    setShowTooltip(false);
  }, [setHighlighted]);

  const Wrapper = (props: any) =>
    showTooltip ? <Tooltip arrow {...props} /> : <div {...props} />;

  return (
    <Wrapper
      title={
        <>
          <h3>Property {property.propertyId}</h3>
          <p>Lat: {property.coordinates[0]}</p>
          <p>Long: {property.coordinates[1]}</p>
        </>
      }
    >
      <div
        className={classes.Marker}
        style={{
          backgroundColor: property.isHighlighted ? "blue" : "cadetblue",
          zIndex: property.isHighlighted ? 1 : 0
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => {
          console.log(property.coordinates);
          setShowTooltip(true);
        }}
        {...rest}
      />
    </Wrapper>
  );
};

export default Marker;
