import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Star, Diamond } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { keyframes } from '@mui/system'; // Import for animations

// Animation keyframes pour zoom et dézoom
const zoomInOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const UserAccess = ({ accessLevel }) => {
    return (
        <Box mt={4} display="flex" justifyContent="center">
            {accessLevel === 'premium' ? (
                <Card
                    sx={{
                        background: 'linear-gradient(to right, #FFD700, #FFA500)', // Dégradé doré
                        color: 'white',
                        maxWidth: 400,
                        // height: '15vh',
                        boxShadow: 8,
                        borderRadius: 3,
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)' // Légère augmentation au survol
                        }
                    }}
                >
                    <CardContent>
                        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                            <Diamond sx={{ fontSize: 50, color: 'white' }} />
                            <Typography variant="h4" sx={{ mx: 2, fontWeight: 'bold' }}>
                                PREMIUM
                            </Typography>
                            <Diamond sx={{ fontSize: 50, color: 'white' }} />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Star sx={{ fontSize: 30, color: 'white' }} />
                            <Star sx={{ fontSize: 30, color: 'white', mx: 1 }} />
                            <Star sx={{ fontSize: 30, color: 'white' }} />
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Card
                    sx={{
                        bgcolor: 'silver',
                        color: 'white',
                        maxWidth: 400,
                        boxShadow: 8,
                        borderRadius: 3,
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)' // Légère augmentation au survol
                        }
                    }}
                >
                    <CardContent>
                        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                            <Star sx={{ fontSize: 30, color: '#cd7f32' }} /> {/* Couleur bronze */}
                            <Typography variant="h4" sx={{ mx: 2, fontWeight: 'bold' }}>
                                STANDARD
                            </Typography>
                            <Star sx={{ fontSize: 30, color: '#cd7f32' }} />
                        </Box>
                        <Button
                            variant="contained"
                            color="warning"
                            fullWidth
                            sx={{
                                animation: `${zoomInOut} 2s infinite ease-in-out`, // Animation pour zoom et dézoom infini
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                '&:hover': {
                                    backgroundColor: 'orange', // Couleur d'arrière-plan au survol
                                    transform: 'scale(1.05)' // Légère augmentation au survol
                                }
                            }}
                        >
                            Passer PREMIUM
                            {/* Diamant scintillant */}
                            <Diamond sx={{ fontSize: 24, color: 'white', mr: 1, animation: `${zoomInOut} 2s infinite ease-in-out` }} />{' '}
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

UserAccess.propTypes = {
    accessLevel: PropTypes.string.isRequired
};

export default UserAccess;
