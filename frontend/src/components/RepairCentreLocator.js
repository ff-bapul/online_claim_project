// src/components/RepairCentreLocator.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTheme } from '@mui/system';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default icon URL
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const RepairCentreLocator = () => {
  const theme = useTheme();
  const [userLocation, setUserLocation] = useState(null);
  const [repairCentres, setRepairCentres] = useState([
    {
      id: 1,
      name: 'Repair Centre A',
      location: { lat: 18.5204, lng: 73.8567 },
      address: 'Pune, Maharashtra',
      contact: '+91-9876543210',
    },
    {
      id: 2,
      name: 'Repair Centre B',
      location: { lat: 18.5195, lng: 73.9260 },
      address: 'Hadapsar, Pune, Maharashtra',
      contact: '+91-9876543211',
    },
    {
      id: 3,
      name: 'Repair Centre C',
      location: { lat: 18.5588, lng: 73.8010 },
      address: 'Baner, Pune, Maharashtra',
      contact: '+91-9876543212',
    },
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  }, []);

  const handleCentreClick = (centre) => {
    alert(`Details of ${centre.name}:\nAddress: ${centre.address}\nContact: ${centre.contact}`);
  };

  return (
    <Box sx={{ width: '100%', height: '70vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: theme.spacing(4) }}>
        Repair Centre Locator
      </Typography>

      {userLocation ? (
        <MapContainer center={userLocation} zoom={12} style={{ height: '60vh' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User's current location */}
          <Marker position={userLocation} icon={markerIcon}>
            <Popup>Your Current Location</Popup>
          </Marker>

          {/* Display nearby repair centres */}
          {repairCentres.map((centre) => (
            <Marker key={centre.id} position={centre.location} icon={markerIcon}>
              <Popup>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{centre.name}</Typography>
                    <Typography variant="body2">{centre.address}</Typography>
                    <Typography variant="body2">Contact: {centre.contact}</Typography>
                    <Button variant="contained" onClick={() => handleCentreClick(centre)} sx={{ marginTop: 1 }}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Fetching your location...
        </Typography>
      )}
    </Box>
  );
};

export default RepairCentreLocator;
