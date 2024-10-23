import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Collapse,
    Grid,
    TextField,
    Autocomplete,
    Box,
    Rating,
    Stack
} from '@mui/material';
import { red, blue, green, orange, purple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import c1Img from 'assets/images/cybers/c1.jpg';
import c2Img from 'assets/images/cybers/c2.jpg';

import PhoneIcon from '@mui/icons-material/Phone';
import { IconPhoneCall, IconPrinter } from '@tabler/icons-react';
import { Call, Print } from '@mui/icons-material';

const cybers = [
    {
        name: 'Cyber Paris',
        description: 'Un des meilleurs cybers de Paris, avec un service rapide et des ordinateurs performants.',
        img: c1Img,
        services: 'Impression, numérisation, accès Internet haut débit.',
        hours: 'Ouvert de 8h à 22h',
        avatarColor: red[500],
        rating: 5,
        phoneNumber: +242067650758
    },
    {
        name: 'Cyber Lyon',
        description: 'Espace calme et moderne pour travailler ou jouer.',
        img: c2Img,
        services: 'Impression, Wi-Fi, café sur place.',
        hours: 'Ouvert de 9h à 20h',
        avatarColor: blue[500],
        rating: 4.5,
        phoneNumber: +242067650758
    },
    {
        name: 'Cyber Marseille',
        description: 'Connexion ultra rapide et ambiance conviviale.',
        img: c1Img,
        services: 'Location de matériel, accès gaming.',
        hours: 'Ouvert 24h/24',
        avatarColor: green[500],
        rating: 4.5,
        phoneNumber: +242067650758
    },
    {
        name: 'Cyber Toulouse',
        description: 'Services d’impression et numérisation à la pointe.',
        img: c2Img,
        services: 'Impression, accès Internet, consultation d’e-mails.',
        hours: 'Ouvert de 7h à 21h',
        avatarColor: orange[500],
        rating: 4.5,
        phoneNumber: +242067650758
    },
    {
        name: 'Cyber Bordeaux',
        description: 'Espace de coworking avec ordinateurs en libre-service.',
        img: c1Img,
        services: 'Accès Internet, salle de réunion.',
        hours: 'Ouvert de 10h à 18h',
        avatarColor: purple[500],
        rating: 4.5,
        phoneNumber: +242067650758
    }
];

// Liste des services disponibles pour le filtre
const servicesOptions = ['Impression', 'Wi-Fi', 'Numérisation', 'Accès gaming', 'Café sur place', 'Location de matériel'];

const FavoriteCybers = () => {
    const [expanded, setExpanded] = useState(null);
    const [filter, setFilter] = useState({ name: '', service: '', hours: '' });

    const handleExpandClick = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    const handleFilterChange = (event, key) => {
        setFilter({ ...filter, [key]: event.target.value });
    };

    const handleServiceFilterChange = (event, value) => {
        setFilter({ ...filter, service: value });
    };

    // Filtrer les cybers en fonction des critères sélectionnés
    const filteredCybers = cybers.filter(
        (cyber) =>
            cyber.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            cyber.services.toLowerCase().includes(filter.service?.toLowerCase() || '') &&
            cyber.hours.includes(filter.hours)
    );

    return (
        <Box sx={{ padding: 3 }}>
            {/* Filtres */}
            <Box sx={{ marginBottom: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Rechercher un cyber"
                            variant="outlined"
                            value={filter.name}
                            onChange={(event) => handleFilterChange(event, 'name')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            options={servicesOptions}
                            value={filter.service}
                            onChange={handleServiceFilterChange}
                            renderInput={(params) => <TextField {...params} label="Filtrer par service" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Horaires"
                            variant="outlined"
                            value={filter.hours}
                            onChange={(event) => handleFilterChange(event, 'hours')}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Affichage des cartes des cybers favoris filtrés */}
            <Grid container spacing={3}>
                {filteredCybers.map((cyber, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                maxWidth: 345,
                                boxShadow: 3,
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: cyber.avatarColor, color: '#fff' }} aria-label="cyber">
                                        {cyber.name.slice(6).charAt(0)}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={cyber.name}
                                subheader={cyber.hours}
                            />
                            <CardMedia component="img" height="194" image={cyber.img} alt={`Image de ${cyber.name}`} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {cyber.description}
                                </Typography>
                                <Typography mt={2}>
                                    <Rating value={cyber.rating} precision={0.5} readOnly size="medium" />
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    <Typography>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon sx={{ color: 'red' }} />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon sx={{ color: blue[500] }} />
                                        </IconButton>
                                        <IconButton
                                            aria-label="Call"
                                            component="a"
                                            href={`tel:${cyber.phoneNumber}`}
                                            // sx={{
                                            //     backgroundColor: '#4CAF50',
                                            //     color: 'white',
                                            //     '&:hover': {
                                            //         backgroundColor: '#45A049'
                                            //     }
                                            // }}
                                        >
                                            <PhoneIcon sx={{ color: green[500] }} />
                                        </IconButton>
                                        <IconButton aria-label="print">
                                            <Print sx={{ color: purple[500] }} />
                                        </IconButton>
                                    </Typography>
                                    <Typography sx={{ marginRight: 0, marginLeft: 'auto' }}>
                                        <IconButton
                                            onClick={() => handleExpandClick(index)}
                                            aria-expanded={expanded === index}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </Typography>
                                </Stack>
                            </CardActions>
                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Services disponibles :</Typography>
                                    <Typography paragraph>{cyber.services}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FavoriteCybers;
