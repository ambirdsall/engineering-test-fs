import React from "react";
import GoogleMap from "google-map-react";
import { fitBounds } from "google-map-react/utils";

import { Bounds } from "../../types/map";
import { Property } from "../../domain/property";
import Marker from "./Marker";

const API_KEY = "AIzaSyBpPVPeXWKvY-UxSTDD0FcOY-c17Z5nyl8";
const [height, width] = [300, 300];

type MapProps = {
  bounds: Bounds;
  properties?: Property[];
  setHighlighted?: Function;
};

const Map = ({ bounds, properties, setHighlighted }: MapProps) => {
  // checking a single dimension of the bounds is sufficient to tell if it has
  // been calculated from actual data or is in its initial state
  if (bounds.nw.lat === -Infinity) {
    // no locations, no map. Them's the rules, at least for prototype stage.
    return <div style={{ height, width }} />;
  }

  const { center, zoom } = fitBounds(bounds, { width, height });

  return (
    <div style={{ height, width }}>
      <GoogleMap
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={{ lat: 37.77, lng: -122.41 }}
        center={center}
        zoom={zoom}
      >
        {properties.map(p => (
          <Marker
            key={p.propertyId}
            property={p}
            lat={p.coordinates[0]}
            lng={p.coordinates[1]}
            setHighlighted={setHighlighted}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
