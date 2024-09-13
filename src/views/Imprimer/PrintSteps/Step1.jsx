import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const typesImpression = [
    { value: 'document', label: 'Impression Document' },
    { value: 'sublimation', label: 'Impression à Sublimation' },
    { value: 'bache', label: 'Impression sur Bâche' },
    { value: '3d', label: 'Impression 3D' }
];

const dimensionsBache = [
    { value: '100x200', label: '100x200 cm' },
    { value: '200x300', label: '200x300 cm' }
];

const formatsDocument = [
    { value: 'A3', label: 'A3' },
    { value: 'A4', label: 'A4' },
    { value: 'bristol', label: 'Bristol' },
    { value: 'mat', label: 'Papier Mat' }
];

const orientations = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Paysage' }
];

const typesAppareil = [
    { value: 'laser', label: 'Laser' },
    { value: 'ancre', label: 'Ancre' }
];

const supportsSublimation = [
    { value: 'vetement', label: 'Vêtement' },
    { value: 'objet_solide', label: 'Objet Solide' },
    { value: 'vinil', label: 'Vinil' },
    { value: 'papier_colant', label: 'Papier Collant' }
];

export default function Step1({ onNext }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            typeImpression: 'document',
            quantity: 1,
            coloration: '',
            formatPapier: '',
            appareil: '',
            orientation: '',
            supportSublimation: '',
            dimensionsBache: ''
        }
    });

    const selectedType = watch('typeImpression');

    useEffect(() => {
        setValue('typeImpression', 'document'); // Assure la valeur par défaut au démarrage
    }, [setValue]);

    const onSubmit = (data) => {
        onNext(data);
    };

    const handleChangeType = (event) => {
        const value = event.target.value;
        setValue('typeImpression', value);
    };

    const renderCaracteristiques = () => {
        if (selectedType === '3d') {
            return (
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="file"
                        label="Uploader le modèle 3D"
                        {...register('model3d', { required: selectedType === '3d' })}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            );
        }

        if (selectedType === 'bache') {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="file"
                            label="Uploader l'image"
                            {...register('imageBache', { required: selectedType === 'bache' })}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Dimensions de la bâche"
                            {...register('dimensionsBache', { required: selectedType === 'bache' })}
                            value={watch('dimensionsBache', '')} // Assure une valeur par défaut
                        >
                            {dimensionsBache.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </>
            );
        }

        if (selectedType === 'sublimation') {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="file"
                            label="Uploader le document"
                            {...register('documentSublimation', { required: selectedType === 'sublimation' })}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Nature du support"
                            {...register('supportSublimation', { required: selectedType === 'sublimation' })}
                            value={watch('supportSublimation', '')} // Assure une valeur par défaut
                        >
                            {supportsSublimation.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </>
            );
        }

        if (selectedType === 'document') {
            return (
                <>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="file"
                            label="Uploader le document"
                            {...register('document', { required: selectedType === 'document' })}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Coloration"
                            {...register('coloration', { required: selectedType === 'document' })}
                            value={watch('coloration', '')} // Assure une valeur par défaut
                        >
                            <MenuItem value="couleur">En Couleur</MenuItem>
                            <MenuItem value="noir_blanc">Noir & Blanc</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Format du papier"
                            {...register('formatPapier', { required: selectedType === 'document' })}
                            value={watch('formatPapier', '')} // Assure une valeur par défaut
                        >
                            {formatsDocument.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox {...register('rectoVerso')} />} label="Recto-Verso" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Appareil"
                            {...register('appareil', { required: selectedType === 'document' })}
                            value={watch('appareil', '')} // Assure une valeur par défaut
                        >
                            {typesAppareil.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Orientation"
                            {...register('orientation', { required: selectedType === 'document' })}
                            value={watch('orientation', '')} // Assure une valeur par défaut
                        >
                            {orientations.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </>
            );
        }

        return null;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        select
                        fullWidth
                        label="Type d'impression"
                        value={selectedType || 'document'}
                        onChange={handleChangeType}
                        {...register('typeImpression', { required: true })}
                    >
                        {typesImpression.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Conteneur des caractéristiques */}
                <Grid item xs={12}>
                    <Box border={1} borderRadius={4} borderColor="grey.400" padding={2} marginTop={2}>
                        <Typography variant="h6" gutterBottom>
                            Caractéristiques
                        </Typography>
                        <Grid container spacing={2}>
                            {renderCaracteristiques()}
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Nombre d'exemplaires"
                        {...register('quantity', { required: true })}
                        defaultValue={1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Suivant
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

Step1.propTypes = {
    onNext: PropTypes.func.isRequired
};
