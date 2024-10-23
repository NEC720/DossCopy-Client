import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Button, Grid, Typography, Card, CardMedia, CardContent, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import api from 'services/api';
import 'leaflet/dist/leaflet.css'; // Import du CSS de Leaflet

// Icônes personnalisées
const currentLocationIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', // Jaune fluo
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const openCyberIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // Vert pour Ouvert
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const closedCyberIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Rouge pour Fermer
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Fix pour les icônes de marqueur manquantes avec Webpack
const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconAnchor: [12, 40]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Step2({ onNext, onBack }) {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [cybers, setCybers] = useState([]);
    const [selectedCyber, setSelectedCyber] = useState(null);
    const [loading, setLoading] = useState(false);
    const mapRef = useRef();

    // Fonction pour calculer la distance
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance en km
    };

    // Récupérer la localisation actuelle avec une haute précision
    useEffect(() => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLoading(false);
                    getCybersNearby(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    setLoading(false);
                    console.error('Erreur de géolocalisation:', error);
                },
                {
                    enableHighAccuracy: true, // Activer une haute précision
                    timeout: 15000, // Temps maximal pour obtenir la position (en millisecondes)
                    maximumAge: 0 // Ne pas utiliser une position mise en cache
                }
            );
        }
    }, []);

    // Fonction pour récupérer les cybers à proximité
    const getCybersNearby = async (latitude, longitude) => {
        try {
            const response = await api.get('/api/cybers'); // Remplace par l'URL de ton serveur
            console.log(response.data);

            const cybersData = response.data
                .filter((cyber) => cyber.latitude && cyber.longitude) // Filtrer les cybers sans lat/lng
                .map((cyber) => ({
                    ...cyber,
                    distance: calculateDistance(latitude, longitude, cyber.latitude, cyber.longitude)
                }));

            // Tri des cybers par distance
            cybersData.sort((a, b) => a.distance - b.distance);
            setCybers(cybersData);
        } catch (error) {
            console.error('Erreur lors de la récupération des cybers:', error);
        }
    };

    // Redimensionnement de la carte
    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 100);
        }
    }, [mapRef.current]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                {location.latitude && location.longitude ? (
                    <MapContainer
                        center={[location.latitude, location.longitude]}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                        ref={mapRef}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[location.latitude, location.longitude]} icon={currentLocationIcon}>
                            <Popup>Vous êtes ici</Popup>
                        </Marker>
                        {cybers.map(
                            (cyber, index) =>
                                cyber.latitude &&
                                cyber.longitude && (
                                    <Marker
                                        key={cyber.id}
                                        position={[cyber.latitude, cyber.longitude]}
                                        icon={cyber.status === 'Ouvert' ? openCyberIcon : closedCyberIcon}
                                        eventHandlers={{
                                            click: () => setSelectedCyber(cyber)
                                        }}
                                    >
                                        <Popup>{cyber.name}</Popup>
                                    </Marker>
                                )
                        )}
                    </MapContainer>
                ) : (
                    <Typography>Chargement de la carte...</Typography>
                )}
            </Grid>
            <Grid item xs={4}>
                {selectedCyber ? (
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://ordiland.com/img/cms/cyber-2.JPG`} // Placeholder pour les images des cybers
                            alt={selectedCyber.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{selectedCyber.name}</Typography>
                            <Typography>{selectedCyber.address}</Typography>
                            <Typography>Horaires : {selectedCyber.openHours}</Typography>
                            <Typography>Disponibilité : {selectedCyber.status}</Typography>
                            <Rating value={selectedCyber.rating} readOnly />
                        </CardContent>
                    </Card>
                ) : (
                    <Typography>Sélectionnez un cyber sur la carte pour voir les détails</Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <Button onClick={onBack}>Précédent</Button>
                <Button variant="contained" onClick={() => onNext({ selectedCyber })} disabled={!selectedCyber}>
                    Suivant
                </Button>
            </Grid>
        </Grid>
    );
}

Step2.propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};
