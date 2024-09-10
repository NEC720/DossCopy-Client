import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const typesImpression = [
    { value: 'standard', label: 'Impression Standard' },
    { value: 'photo', label: 'Impression Photo' },
    { value: 'a3', label: 'Impression A3' }
];

export default function Step1({ onNext }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField select fullWidth label="Type d'impression" {...register('typeImpression', { required: true })}>
                        {typesImpression.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Caractéristiques" {...register('characteristics')} multiline />
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
                    <Button type="submit" variant="contained" fullWidth>
                        Suivant
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

Step1.propTypes = {
    onNext: PropTypes.func.isRequired,
};