import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapWithMarker = ({ soldiers }) => {
  // Default center to the first soldier's location
  const defaultCenter =
    soldiers.length > 0 ? [soldiers[0].location.latitude, soldiers[0].location.longitude] : [0, 0];

  return (
    <MapContainer
      center={defaultCenter} // Center map on the first soldier's location
      zoom={5} // Adjust zoom for multiple locations
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {soldiers.map((soldier, index) => (
        <Marker
          key={index}
          position={[soldier.location.latitude, soldier.location.longitude]}
        >
          <Popup>
            <strong>{soldier.name}</strong><br />
            Rank: {soldier.rank}<br />
            Status: {soldier.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarker;
