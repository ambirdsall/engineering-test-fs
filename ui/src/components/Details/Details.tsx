import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import PropertyImage from "../PropertyTable/PropertyImage";
import { GetJSON as Get } from "../../api";
import { Statistics } from "../../domain/property";

type Props = RouteComponentProps<{ id: string }> & {
  location?: { state?: any };
};

const statDisplayName = (stat: keyof Statistics): string => {
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

const statDisplayStat = (
  statName: keyof Statistics,
  value: number | number[]
): string => {
  switch (statName) {
    case "building_area_sqm":
      return (value as number[]).join();
    case "parcel_area_sqm":
      return `${value}`;
    case "zone_density":
      return (value as number[]).join();
    case "building_distances_m":
      return (value as number[]).join();
    default:
      return "";
  }
};

const Details: React.FC<Props> = ({ match, location }: Props) => {
  const { id } = match.params;
  const [stats, setStats] = useState<Statistics | null>(null);

  const { lat, lng } = location.state;

  const StatsTable = ({ stats }: { stats: Statistics | null }) => {
    if (!stats) return null;

    const rows = Object.keys(stats).map(k => {
      return (
        <div key={k}>
          <dt>{statDisplayName(k as keyof Statistics)}</dt>
          <dd>
            {statDisplayStat(
              k as keyof Statistics,
              stats[k as keyof Statistics]
            )}
          </dd>
        </div>
      );
    });

    return <dl>{rows}</dl>;
  };

  useEffect(() => {
    Get(`/statistics/${id}?distance=100`).then((stats: Statistics) => {
      (window as any).stats = stats;
      setStats(stats);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      here's to you, {id}, at {lat}/{lng}
      <PropertyImage propertyId={id} maxHeight={300} />
      <StatsTable stats={stats} />
    </div>
  );
};

export default withRouter(Details);
