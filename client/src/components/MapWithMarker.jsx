import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const offsetCoordinates = (lat, lng, index, total) => {
  const offsetFactor = 0.001; // Adjust as needed
  const angle = (index / total) * 2 * Math.PI; // Spread markers in a circle
  return {
    latitude: lat + offsetFactor * Math.cos(angle),
    longitude: lng + offsetFactor * Math.sin(angle),
  };
};

const MapWithMarker = ({ soldiers }) => {
  // Default center set to Bangalore
  const bangaloreCenter = [12.971598, 77.594566];

  return (
    <MapContainer
      center={bangaloreCenter}
      zoom={10}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {soldiers.map((soldier, index) => {
        // Apply offset to prevent overlap if multiple soldiers are at the same location
        const { latitude, longitude } = offsetCoordinates(
          soldier.location.latitude,
          soldier.location.longitude,
          index,
          soldiers.length
        );

        return (
          
          <Marker key={index} position={[latitude, longitude]}>
            <Popup>
              <strong>{soldier.name}</strong>
              <br />
              Rank: {soldier.rank}
              <br />
              Status: {soldier.status}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWithMarker;
