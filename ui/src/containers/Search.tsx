import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Post } from "../api";

type Property = any;

const useInputData: (a: number) => [number, (e: ChangeEvent) => void] = (
  initialData: number
) => {
  const [inputData, setInputData] = useState(initialData);
  const onInputDataChanged = useCallback(e => setInputData(+e.target.value), [
    setInputData
  ]);

  return [inputData, onInputDataChanged];
};

export default function Search() {
  const [lat, onLatChanged] = useInputData(-80.0782213);
  const [lng, onLngChanged] = useInputData(26.8849731);
  /* const [radius] = useState(1755000); */
  const [radius, onRadiusChanged] = useInputData(10000);
  const [properties, setProperties] = useState<Property[]>([]);

  const findWithinArea = useCallback((coordinates, radius) => {
    Post("/find", {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates
      },
      "x-distance": radius
    }).then((res: Property[]) => {
      setProperties(res);
    });
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      findWithinArea([lat, lng], radius);
    },
    [lat, lng, radius, findWithinArea]
  );

  // load data on component mount
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
      {properties.map((p: Property) => (
        <div>
          {p.propertyId}: {p.coordinates.join(", ")}
        </div>
      ))}
    </div>
  );
}
