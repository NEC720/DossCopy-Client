import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Grid, Typography, Card, CardMedia, CardContent, Rating } from '@mui/material';
import PropTypes from 'prop-types';

const cybers = [
    // Exemple de cybers avec coordonnées et détails
    {
        id: 1,
        name: 'Cyber Alpha',
        position: [51.505, -0.09],
        address: '123 Rue Alpha',
        rating: 4.5,
        openHours: '8h-20h',
        availability: 'Disponible'
    }
    // Autres cybers...
];

export default function Step2({ onNext, onBack }) {
    const [selectedCyber, setSelectedCyber] = useState(null);

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {cybers.map((cyber) => (
                        <Marker
                            key={cyber.id}
                            position={cyber.position}
                            eventHandlers={{
                                click: () => {
                                    setSelectedCyber(cyber);
                                }
                            }}
                        >
                            <Popup>{cyber.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Grid>
            <Grid item xs={4}>
                {selectedCyber ? (
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`/path/to/cyber/images/${selectedCyber.id}.jpg`} // Placeholder pour les images des cybers
                            alt={selectedCyber.name}
                        />
                        <CardContent>
                            <Typography variant="h5">{selectedCyber.name}</Typography>
                            <Typography>{selectedCyber.address}</Typography>
                            <Typography>Horaires : {selectedCyber.openHours}</Typography>
                            <Typography>Disponibilité : {selectedCyber.availability}</Typography>
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
