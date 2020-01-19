import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps, useHistory } from "react-router-dom";
import { Paper, Grid, Button } from "@material-ui/core";
import PropertyImage from "../PropertyTable/PropertyImage";
import { GetJSON as Get } from "../../api";
import { Statistics } from "../../domain/property";

import classes from "./Details.module.css";

type Props = RouteComponentProps<{ id: string }> & {
  location?: { state?: any };
};

const formatStatName = (stat: keyof Statistics): string => {
  switch (stat) {
    case "building_area_sqm":
      return "Building Area (in sq. mi.)";
    case "parcel_area_sqm":
      return "Parcel Area (in sq. mi.)";
    case "zone_density":
      return "Zone Density";
    case "building_distances_m":
      return "Building Distances (in m.)";
    default:
      return "";
  }
};

const clamped = (n: number) => n.toFixed(2);
const asLi = (val: number | string) => <li>{val}</li>;

const formatStatNumber = (
  statName: keyof Statistics,
  value: number | number[]
) => {
  switch (statName) {
    case "building_area_sqm":
      return <ul>{(value as number[]).map(clamped).map(asLi)}</ul>;
    case "parcel_area_sqm":
      return <ul>{asLi(clamped(value as number))}</ul>;
    case "zone_density":
      return <ul>{(value as number[]).map(clamped).map(asLi)}</ul>;
    case "building_distances_m":
      return <ul>{(value as number[]).map(clamped).map(asLi)}</ul>;
    default:
      return "";
  }
};

const Details: React.FC<Props> = ({ match, location }: Props) => {
  const { id } = match.params;
  const [stats, setStats] = useState<Statistics | null>(null);
  const history = useHistory();
  const { lat, lng } = location.state;

  const StatsTable = ({ stats }: { stats: Statistics | null }) => {
    if (!stats) return null;

    const rows = Object.keys(stats).map(k => {
      return (
        <div key={k}>
          <dt>{formatStatName(k as keyof Statistics)}</dt>
          <dd>
            {formatStatNumber(
              k as keyof Statistics,
              stats[k as keyof Statistics]
            )}
          </dd>
        </div>
      );
    });

    const coords = (
      <>
        <dt>Latitude</dt>
        <dd>
          <ul>{asLi(lat)}</ul>
        </dd>
        <dt>Longitude</dt>
        <dd>
          <ul>{asLi(lng)}</ul>
        </dd>
      </>
    );

    return (
      <dl>
        {coords}
        {rows}
      </dl>
    );
  };

  useEffect(() => {
    Get(`/statistics/${id}?distance=100`).then((stats: Statistics) => {
      (window as any).stats = stats;
      setStats(stats);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.Container}>
      <Grid container spacing={2}>
        <Grid item container xs={12} md={4} direction="column">
          <PropertyImage propertyId={id} height={300} />
          <Button
            style={{ marginTop: "1em" }}
            onClick={() => history.push("/")}
          >
            Back
          </Button>
        </Grid>
        <Grid item container xs={12} md={8}>
          <h2>Property {id}</h2>
          <StatsTable stats={stats} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(Details);
