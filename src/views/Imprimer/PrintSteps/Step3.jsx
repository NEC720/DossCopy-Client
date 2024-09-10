import React from 'react';
import { Button, Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

export default function Step3({ formData, onBack, onSubmit }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Récapitulatif de la demande d'impression :</Typography>
                <Typography>Type d'impression : {formData.typeImpression}</Typography>
                <Typography>Caractéristiques : {formData.characteristics}</Typography>
                <Typography>Nombre d'exemplaires : {formData.quantity}</Typography>
                <Typography>Cyber sélectionné : {formData.selectedCyber?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={onBack}>Précédent</Button>
                <Button variant="contained" onClick={onSubmit}>
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
