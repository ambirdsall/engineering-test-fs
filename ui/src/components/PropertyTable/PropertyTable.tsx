import React from "react";
import { useHistory } from "react-router-dom";
import { Property } from "../../domain/property";
import PropertyImage from "./PropertyImage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import classes from "./PropertyTable.module.css";

type PropertyTableProps = { properties: Property[]; setHighlighted?: Function };

const PropertyTable = ({ properties, setHighlighted }: PropertyTableProps) => {
  const history = useHistory();

  const propertyCards = properties.map(p => {
    const [lat, lng] = p.coordinates;
    const className = p.isHighlighted
      ? [classes.Card, classes.callout].join(" ")
      : classes.Card;

    return (
      <Card
        className={className}
        key={p.propertyId}
        onMouseEnter={() => setHighlighted(p.propertyId)}
        onMouseLeave={() => setHighlighted("")}
        onClick={() => {
          history.push("details/" + p.propertyId, { lat, lng });
        }}
      >
        <CardContent>
          <div className={classes.Img}>
            <PropertyImage propertyId={p.propertyId} />
          </div>
          <p>
            <strong>Latitude:</strong> {lat}
          </p>
          <p>
            <strong>Longitude:</strong> {lng}
          </p>
        </CardContent>
      </Card>
    );
  });

  return <>{propertyCards}</>;
};

export default PropertyTable;
