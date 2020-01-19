import React from "react";
import { useHistory } from "react-router-dom";
import { Property } from "../../domain/property";
import PropertyImage from "./PropertyImage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import classes from "./PropertyTable.module.css";

type PropertyTableProps = { properties: Property[] };

const PropertyTable = ({ properties }: PropertyTableProps) => {
  const history = useHistory();

  const propertyCards = properties.map(p => {
    const [lat, lng] = p.coordinates;

    return (
      <Card
        className={classes.Card}
        key={p.propertyId}
        onClick={() => {
          history.push("details/" + p.propertyId);
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
