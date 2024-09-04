import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

const PopularCard = ({ isLoading }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cybers.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cybers.length) % cybers.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // Change image every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const cybers = [
        {
            name: 'Bajaj Finery',
            image: 'https://www.loisirsdansmaville.fr/ressources/images-tas-villes/cambrai/1-annuaire-en-ligne-des-cybercafes-cambrai.jpg?version=1',
            features: [
                { name: 'Nom', amount: 'Bajaj Finery', profit: '10% Profit', iconColor: 'success' },
                { name: 'Adresse', amount: '1 Rue Imaginaire', profit: '5% Profit', iconColor: 'success' },
                { name: 'Feature 3', amount: '$1839.00', profit: '10% Profit', iconColor: 'success' },
                { name: 'Avis', amount: '$200.00', profit: '5% Profit', iconColor: 'success' }
                // Add more features as needed
            ]
        },
        {
            name: 'TTML',
            image: 'https://www.afribone.com/wp-content/uploads/2022/02/1-41.jpg',
            features: [
                { name: 'Nom', amount: 'TTML', profit: '10% Profit', iconColor: 'success' },
                { name: 'Adresse', amount: '12 Rue Imaginaire', profit: '5% Profit', iconColor: 'success' },
                { name: 'Feature 3', amount: '$100.00', profit: '10% loss', iconColor: 'orange' },
                { name: 'Avis', amount: '$150.00', profit: '8% loss', iconColor: 'orange' }
                // Add more features as needed
            ]
        },
        {
            name: 'Reliance',
            image: 'https://img.lemde.fr/2015/10/08/0/0/1024/683/800/0/75/0/dc3f0d0_10485-wery16.JPG',
            features: [
                { name: 'Nom', amount: 'Reliance', profit: '10% Profit', iconColor: 'success' },
                { name: 'Adresse', amount: '123 Rue Imaginaire', profit: '12% Profit', iconColor: 'success' },
                { name: 'Feature 3', amount: '$189.00', profit: '10% loss', iconColor: 'orange' },
                { name: 'Avis', amount: '$200.00', profit: '8% loss', iconColor: 'orange' }
                // Add more features as needed
            ]
        },
        {
            name: 'Stolon',
            image: 'https://img.lemde.fr/2015/10/08/0/0/2000/1333/800/0/75/0/fed26fc_25040-1pkgurr.jpg',
            features: [
                { name: 'Nom', amount: 'Stolon', profit: '10% Profit', iconColor: 'success' },
                { name: 'Adresse', amount: '1234 Rue Imaginaire', profit: '12% Profit', iconColor: 'success' },
                { name: 'Feature 3', amount: '$189.00', profit: '10% loss', iconColor: 'orange' },
                { name: 'Avis', amount: '$200.00', profit: '8% loss', iconColor: 'orange' }
                // Add more features as needed
            ]
        }
    ];

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Cybers Favoris</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{ color: 'primary.200', cursor: 'pointer' }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={1}>
                                        <Button onClick={handlePrevious} variant="outlined">
                                            <KeyboardArrowLeftIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <img
                                            src={cybers[currentIndex].image}
                                            alt="cyber"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                height: 'auto'
                                            }}
                                        />
                                        <Grid container direction="column" sx={{ mt: 2 }}>
                                            {cybers[currentIndex].features.map((feature, index) => (
                                                <React.Fragment key={index}>
                                                    <Grid item>
                                                        <Grid container direction="column">
                                                            <Grid item>
                                                                <Grid container alignItems="center" justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1" color="inherit">
                                                                            {feature.name}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                                            <Grid item>
                                                                                <Typography variant="subtitle1" color="inherit">
                                                                                    {feature.amount}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Avatar
                                                                                    variant="rounded"
                                                                                    sx={{
                                                                                        width: 16,
                                                                                        height: 16,
                                                                                        borderRadius: '5px',
                                                                                        bgcolor: `${feature.iconColor}.light`,
                                                                                        color: `${feature.iconColor}.dark`,
                                                                                        ml: 2
                                                                                    }}
                                                                                >
                                                                                    {feature.profit.includes('Profit') ? (
                                                                                        <KeyboardArrowUpOutlinedIcon
                                                                                            fontSize="small"
                                                                                            color="inherit"
                                                                                        />
                                                                                    ) : (
                                                                                        <KeyboardArrowDownOutlinedIcon
                                                                                            fontSize="small"
                                                                                            color="inherit"
                                                                                        />
                                                                                    )}
                                                                                </Avatar>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle2" sx={{ color: `${feature.iconColor}.dark` }}>
                                                                    {feature.profit}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {index < cybers[currentIndex].features.length - 1 && <Divider sx={{ my: 1.5 }} />}
                                                </React.Fragment>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button onClick={handleNext} variant="outlined">
                                            <KeyboardArrowRightIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
