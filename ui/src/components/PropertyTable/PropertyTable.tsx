import React from "react";
import { Property } from "../../domain/property";
import PropertyImage from "./PropertyImage";

import classes from "./PropertyTable.module.css";

type PropertyTableProps = { properties: Property[] };

const PropertyTable = ({ properties }: PropertyTableProps) => {
  return (
    <table className={classes.Table}>
      <thead>
        <tr>
          <th>Property</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {properties.map(p => {
          const [lat, lng] = p.coordinates;

          return (
            <tr key={p.propertyId}>
              <td>
                <PropertyImage propertyId={p.propertyId} />
              </td>
              <td>{lat}</td>
              <td>{lng}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PropertyTable;
