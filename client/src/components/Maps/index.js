import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Custom icon for marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to update the map center
const SetViewOnChange = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

const MapComponent = ({ address, city, country, height, width }) => {
  const location = `${address} ${city} ${country}`;
  const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]); // Default marker position

  useEffect(() => {
    if (location) {
      const fetchLocation = async () => {
        try {
          let response = null;
          if (location) {
            response = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&q=${location}&format=json&addressdetails=1`
            );
          }

          // If no results found by name, try searching by pincode
          if (response && response.data.length === 0) {
            response = await axios.get(
              `https://nominatim.openstreetmap.org/search?format=json&postalcode=${location}&format=json&addressdetails=1`
            );
          }

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const newPosition = [parseFloat(lat), parseFloat(lon)];
            setPosition(newPosition);
            setMarkerPosition(newPosition); // Update marker position
            console.log(`Latitude: ${lat}, Longitude: ${lon}`); // Print to console
          } else {
            return
          }
        } catch (error) {
          return error;
        }
      };
      console.log(location);
      fetchLocation();
    }
  }, [location]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        height: `${height}`,
        width: `${width}`,
        marginBottom: "2rem",
        zIndex: 0,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition}>
        <Popup>{location}</Popup>
      </Marker>
      <SetViewOnChange position={position} />
    </MapContainer>
  );
};

export default MapComponent;
