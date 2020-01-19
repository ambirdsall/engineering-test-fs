import React, { useState, useEffect, useCallback } from "react";
import { Property } from "../../domain/property";
import { getPropertiesInArea } from "./api";
import useInputData from "../../hooks/useInputData";
import PropertyTable from "../../components/PropertyTable/PropertyTable";
import { Grid, TextField, Button, Hidden } from "@material-ui/core";

import classes from "./Search.module.css";

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

  const findWithinArea = useCallback(
    (coordinates, radius) =>
      getPropertiesInArea(
        coordinates,
        radius
      ).then((newProperties: Property[]) => setProperties(newProperties)),
    []
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      findWithinArea([lat, lng], radius);
    },
    [lat, lng, radius, findWithinArea]
  );

  useEffect(() => {
    findWithinArea([lat, lng], radius);
    // Prevents "exhaustive deps" warning for one-time on-mount effect
    // eslint-disable-next-line
  }, []);

  const searchForm = (
    <Grid item xs={12} sm={4}>
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
    </Grid>
  );

  return (
    <Grid container>
      {offset}
      {searchForm}
      <Grid
        container
        item
        xs={12}
        sm={6}
        direction="column"
        justify="center"
        alignItems="flex-end"
      >
        <PropertyTable properties={properties} />
      </Grid>
    </Grid>
  );
}
