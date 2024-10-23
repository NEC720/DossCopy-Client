import React from 'react';
import { Button, Typography, Grid, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import PropTypes from 'prop-types';

export default function Step3({ formData, onBack, onSubmit }) {
    console.log(formData, formData.characteristics);
    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Récapitulatif de la demande d'impression
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Type d'impression */}
                        <Typography variant="body1">
                            <strong>Type d'impression :</strong> {formData.typeImpression}
                        </Typography>

                        {/* Caractéristiques */}
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Caractéristiques :</strong>
                        </Typography>
                        <List dense>
                            {formData.characteristics ? (
                                Object.entries(formData.characteristics).map(([key, value]) => (
                                    <ListItem key={key}>
                                        <ListItemText primary={`${key}: ${value}`} />
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem>
                                    <ListItemText primary="Non spécifié" />
                                </ListItem>
                            )}
                        </List>

                        {/* Quantité */}
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Nombre d'exemplaires :</strong> {formData.quantity}
                        </Typography>

                        {/* Cyber sélectionné */}
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Cyber sélectionné :</strong> {formData?.name || 'Non spécifié'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Boutons */}
            <Grid item xs={12} md={8} container justifyContent="space-between">
                <Button variant="outlined" onClick={onBack}>
                    Précédent
                </Button>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Terminer & Imprimer
                </Button>
            </Grid>
        </Grid>
    );
}

Step3.propTypes = {
    formData: PropTypes.shape({
        typeImpression: PropTypes.string.isRequired,
        characteristics: PropTypes.object.isRequired,
        quantity: PropTypes.number.isRequired,
        name: PropTypes.string,
        selectedCyber: PropTypes.shape({
            name: PropTypes.string,
            address: PropTypes.string,
            openHours: PropTypes.string,
            availability: PropTypes.string,
            rating: PropTypes.number
        })
    }).isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};
