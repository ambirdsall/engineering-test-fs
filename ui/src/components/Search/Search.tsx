import React, { useState, useEffect, useCallback } from "react";
import { Grid, TextField, Button, Hidden } from "@material-ui/core";
import { Property } from "../../domain/property";
import { getPropertiesInArea } from "./api";
import useInputData from "../../hooks/useInputData";
import PropertyTable from "../../components/PropertyTable/PropertyTable";
import Map from "../Map/Map";

import classes from "./Search.module.css";

const { max, min } = Math;
// quick and dirty solution, will not work on non-serializable values like functions or Infinity
const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const offset = (
  <Hidden only="xs">
    <Grid item sm={1} />
  </Hidden>
);

export default function Search() {
  const [lat, onLatChanged] = useInputData(-80.0782213);
  const [lng, onLngChanged] = useInputData(26.8849731);
  const [radius, onRadiusChanged] = useInputData(1755000);
  /* const [radius, onRadiusChanged] = useInputData(10000); */
  const [properties, setProperties] = useState<Property[]>([]);
  const setHighlighted = useCallback(
    id => {
      const clonedProperties = deepClone(properties).map(p => {
        p.isHighlighted = false;
        return p;
      });
      const propertyToHighlight = clonedProperties.find(
        p => p.propertyId === id
      );
      if (propertyToHighlight) {
        propertyToHighlight.isHighlighted = true;
      }

      setProperties(clonedProperties);
    },
    [properties]
  );

  const bounds = properties.reduce(
    (bounds, property) => {
      const [lat, lng] = property.coordinates;

      return {
        nw: {
          lat: max(lat, bounds.nw.lat),
          lng: min(lng, bounds.nw.lng)
        },
        se: {
          lat: min(lat, bounds.se.lat),
          lng: max(lng, bounds.se.lng)
        }
      };
    },
    {
      nw: { lat: -Infinity, lng: Infinity },
      se: { lat: Infinity, lng: -Infinity }
    }
  );

  const findWithinArea = useCallback(
    (coordinates, radius) =>
      getPropertiesInArea(
        coordinates,
        radius
      ).then((newProperties: Property[]) => setProperties(newProperties)),
    []
  );

  useEffect(() => {
    findWithinArea([lat, lng], radius);
    // eslint-disable-next-line
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      findWithinArea([lat, lng], radius);
    },
    [lat, lng, radius, findWithinArea]
  );

  const searchForm = (
    <form className={classes.Form} onSubmit={onSubmit}>
      <TextField
        id="latitude"
        label="Latitude"
        type="number"
        size="small"
        margin="normal"
        value={lat}
        onChange={onLatChanged}
      />
      <TextField
        id="longitude"
        label="Longitude"
        type="number"
        size="small"
        margin="normal"
        value={lng}
        onChange={onLngChanged}
      />
      <TextField
        id="radius"
        label="Search Radius"
        type="number"
        size="small"
        margin="normal"
        inputProps={{ step: "1000" }}
        value={radius}
        onChange={onRadiusChanged}
      />
      <Button type="submit" value="Search" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );

  return (
    <Grid container>
      {offset}
      <Grid item container direction="column" xs={12} sm={4}>
        <Map
          bounds={bounds}
          properties={properties}
          setHighlighted={setHighlighted}
        />
        {searchForm}
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        direction="column"
        justify="center"
        alignItems="flex-end"
      >
        <PropertyTable
          properties={properties}
          setHighlighted={setHighlighted}
        />
      </Grid>
    </Grid>
  );
}
