import React, { useState, useEffect, useCallback } from "react";
import { Property } from "../../domain/property";
import { getPropertiesInArea } from "./api";
import useInputData from "../../hooks/useInputData";
import PropertyTable from "../../components/PropertyTable/PropertyTable";

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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={lat} onChange={onLatChanged} />
        <input type="text" value={lng} onChange={onLngChanged} />
        <input
          type="number"
          step="1000"
          value={radius}
          onChange={onRadiusChanged}
        />
        <input type="submit" />
      </form>
      <PropertyTable properties={properties} />
    </div>
  );
}
