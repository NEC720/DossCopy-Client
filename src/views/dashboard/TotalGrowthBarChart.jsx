import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Import the marker icon image using ES6 import
import markerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png';
import markerIcon2x from '../../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import markerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png';

// Fix the default icon path
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom component to center the map on user's location
const MyLocationMarker = ({ setUserLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true });
    map.on('locationfound', (e) => {
      setUserLocation(e.latlng);
      L.marker(e.latlng, { icon: customIcon }).addTo(map).bindPopup('You are here').openPopup();
    });
  }, [map, setUserLocation]);

  return null;
};

const TotalGrowthBarChart = ({ isLoading }) => {
  const [userLocation, setUserLocation] = useState(null);
  const theme = useTheme();

  // Define offsets for marker positions
  const offsetLat = 0.01; // Latitude offset for marker positions
  const offsetLng = 0.01; // Longitude offset for marker positions

  // Fictitious cybers positions around the user's location
  const cybersPositions = userLocation
    ? [
        [userLocation.lat + offsetLat, userLocation.lng + offsetLng], // Top-right
        [userLocation.lat + offsetLat, userLocation.lng - offsetLng], // Top-left
        [userLocation.lat - offsetLat, userLocation.lng + offsetLng], // Bottom-right
        [userLocation.lat - offsetLat, userLocation.lng - offsetLng] // Bottom-left
      ]
    : [];

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Cybers récents</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">4 cybers</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <MapContainer
                center={userLocation || [51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Markers for the fictitious cybers */}
                {cybersPositions.map((position, index) => (
                  <Marker key={index} position={position} icon={customIcon}>
                    <Popup>Cyber {index + 1}</Popup>
                  </Marker>
                ))}

                {/* User's location marker */}
                {userLocation && (
                  <Marker position={userLocation} icon={customIcon}>
                    <Popup>You are here</Popup>
                  </Marker>
                )}

                {/* Custom component to get user's location */}
                <MyLocationMarker setUserLocation={setUserLocation} />
              </MapContainer>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
