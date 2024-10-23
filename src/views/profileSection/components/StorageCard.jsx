import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box, LinearProgress, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { keyframes } from '@mui/system';

// Animation de zoom au survol
const cardHoverZoom = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
`;

// Animation pour la barre de progression
const smoothProgress = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const StorageCard = ({ accessLevel, storageUsed }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // Limites de stockage pour chaque niveau d'accès
    const storageLimit = accessLevel === 'premium' ? 15 : 1;

    // Calcul de la progression du stockage
    const storageProgress = Math.min((storageUsed / storageLimit) * 100, 100);

    // Gestion de l'ouverture et de la fermeture du menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                maxWidth: '100%',
                boxShadow: 12,
                borderRadius: 4,
                p: 3,
                bgcolor: 'background.paper',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    boxShadow: 16,
                    animation: `${cardHoverZoom} 0.5s forwards`
                },
                overflow: 'hidden'
            }}
        >
            {/* Header avec l'intitulé et le menu */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                    Stockage
                </Typography>
                <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon sx={{ color: 'text.secondary' }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={handleMenuClose}>Accéder</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Augmenter stockage</MenuItem>
                </Menu>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Affichage du stockage et barre de progression */}
            <CardContent sx={{ p: 0 }}>
                <Typography variant="body1" color="textSecondary">
                    {storageUsed} Go utilisé(s) sur {storageLimit} Go
                </Typography>

                <Box
                    mt={2}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: 'grey.300',
                        overflow: 'hidden'
                    }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={storageProgress}
                        sx={{
                            height: '100%',
                            borderRadius: 'inherit',
                            bgcolor: 'transparent',
                            '& .MuiLinearProgress-bar': {
                                background:
                                    accessLevel === 'premium'
                                        ? 'linear-gradient(to right, #ffd700, #ff8c00)' // Or et orange pour premium
                                        : 'linear-gradient(to right, #c0c0c0, #808080)', // Argent pour standard
                                transition: 'width 1s ease-in-out', // Animation fluide
                                animation: `${smoothProgress} 1.5s ease-in-out forwards`
                            }
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

StorageCard.propTypes = {
    accessLevel: PropTypes.string.isRequired, // 'premium' ou 'standard'
    storageUsed: PropTypes.number.isRequired // Stockage utilisé par l'utilisateur en Go
};

export default StorageCard;
