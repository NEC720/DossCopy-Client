import React, { useState } from 'react';
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Grid,
    TextField,
    Rating,
    List,
    ListItem,
    ListItemText,
    Chip,
    Avatar,
    AppBar,
    Tabs,
    Tab,
    useTheme,
    Box,
    IconButton,
    CardActions
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import styles for the carousel

import User1 from 'assets/images/users/user-round.svg';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/Favorite';
// import {
//     IconSquareChevronsLeftFilled,
//     IconSquareChevronsUpFilled,
//     IconSquareChevronsDownFilled,
//     IconSquareChevronsUp,
//     IconSquareChevronsDown
// } from '@tabler/icons-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles/swiperStyles.css';

// Import Swiper core and required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import { TabPanel } from '@mui/lab';

const cyberInfos = () => {
    const location = useLocation();
    const { selectedCyber } = location.state || {}; // Récupère l'objet selectedCyber

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Find the selected cyber using the cyberId from URL
    //   const selectedCyber = cybers.find((cyber) => cyber.id === cyberId);

    const handleCommentSubmit = () => {
        console.log('Comment:', comment);
        console.log('Rating:', rating);
        setComment(''); // Reset comment input
        setRating(0); // Reset rating
    };

    // Swiper states
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // TabPannel componnents & states
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired
    };

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`
        };
    }

    // Tabs
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const phoneNumber = +242067650758;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Container>
            {selectedCyber ? (
                <>
                    {/* Carousel cyber */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff'
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-6.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-7.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-8.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-9.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-10.jpg" alt="cyber-desc-" />
                                </SwiperSlide>
                            </Swiper>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12}>
                                {/* Carte Cyber */}
                                <Card sx={{ display: 'flex', marginBottom: 2 }}>
                                    <CardMedia
                                        component="img"
                                        image={selectedCyber.image}
                                        alt={selectedCyber.name}
                                        sx={{ width: '40%', borderRadius: '10px' }}
                                    />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography variant="h4" fontWeight="bold">
                                            {selectedCyber.name}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Adresse: {selectedCyber.address}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Imprimantes: {selectedCyber.printers}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Type d&apos;impression: {selectedCyber.typeOfPrinting}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Services: {selectedCyber.services.join(', ')}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                {/* Map Section */}
                                <MapContainer
                                    center={[selectedCyber.latitude, selectedCyber.longitude]}
                                    zoom={13}
                                    style={{ height: '400px', marginBottom: '20px', borderRadius: '8px' }}
                                >
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
                                    <Marker position={[selectedCyber.latitude, selectedCyber.longitude]}>
                                        <Popup>
                                            {selectedCyber.name} <br /> {selectedCyber.address}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Grid>
                            <Grid
                                container
                                spacing={2}
                                direction={'row'}
                                alignItems="center"
                                justifyContent="center"
                                marginTop={'auto'}
                                marginBottom={'auto'}
                            >
                                {/* Phone call button */}
                                <Grid item>
                                    <IconButton
                                        aria-label="Call"
                                        component="a"
                                        href={`tel:${phoneNumber}`}
                                        sx={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#45A049'
                                            }
                                        }}
                                    >
                                        <PhoneIcon />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary" textAlign="center">
                                        Appeler
                                    </Typography>
                                </Grid>

                                {/* Favorite button */}
                                <Grid item>
                                    <IconButton
                                        aria-label="Add to favorites"
                                        onClick={handleFavoriteClick}
                                        sx={{
                                            color: isFavorite ? '#FF4081' : '#757575'
                                        }}
                                    >
                                        {isFavorite ? <FavoriteOutlinedIcon /> : <FavoriteIcon />}
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary" textAlign="center">
                                        {isFavorite ? 'Favori' : 'Ajouter'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Services et pubs */}
                    <Grid container spacing={2} marginTop={4}>
                        <Grid item xs={8} sx={{ bgcolor: 'Background' }}>
                            {/* <Box sx={{ bgcolor: 'background.paper', width: 500 }}> */}
                            <AppBar position="static">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                    sx={{ backgroundColor: 'black', borderRadius: '10px' }}
                                >
                                    <Tab label="Services" {...a11yProps(0)} />
                                    <Tab label="Personnel" {...a11yProps(1)} />
                                    <Tab label="Détails" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Grid container spacing={2} xs={12}>
                                    <Grid item xs={4}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="https://swiperjs.com/demos/images/nature-10.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Impression
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="https://swiperjs.com/demos/images/nature-10.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Impression 3D
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="https://swiperjs.com/demos/images/nature-10.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Impression 3D
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="https://swiperjs.com/demos/images/nature-10.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Impression 3D
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image="https://swiperjs.com/demos/images/nature-10.jpg"
                                                title="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Impression 3D
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                    across all continents except Antarctica
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                {/* Item Two */}
                                Personnel
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                {/* Item Three */}
                                Détails
                            </TabPanel>
                            {/* </Box> */}
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4">Anonces Cybers et Pubs</Typography>
                        </Grid>
                    </Grid>

                    {/* Temoignages et Avis */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* Testimonials Slider */}
                            <Grid>
                                <Typography variant="h5" fontWeight="bold" marginBottom={2} marginTop={5}>
                                    Témoignages
                                </Typography>
                                <Carousel
                                    showArrows={true}
                                    infiniteLoop={true}
                                    showThumbs={false}
                                    autoPlay={true}
                                    interval={10000}
                                    transitionTime={600} // Transition fluide
                                    emulateTouch={true} // Interaction tactile plus fluide
                                    selectedItem={0} // Forcer l'affichage correct
                                >
                                    {Array.isArray(selectedCyber.testimonials) &&
                                        selectedCyber.testimonials.map((testimonial, index) => (
                                            <div key={index}>
                                                <Grid container spacing={2} xs={12}>
                                                    <Grid item xs={4} sx={{ width: '100%', height: '100%' }}>
                                                        <Grid item xs={12}>
                                                            <Avatar alt="profile user" src={User1} sx={{ width: '100%', height: '100%' }} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4">{testimonial.author}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                                                            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10%' }}>
                                                                {testimonial.date}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography>
                                                                <CommentRoundedIcon />
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                                                                {testimonial.comment}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Rating value={testimonial.rating} readOnly />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                </Carousel>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Comment Section */}
                            {/* <Grid container spacing={2} xs={12} marginTop={3}>
                                <Card sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h3">Donner votre avis</Typography>

                                        <Grid container xs={12} spacing={2} marginTop={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="h4"> Note </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Rating
                                                    size="large"
                                                    value={rating}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setRating(newValue);
                                                    }}
                                                    style={{ marginBottom: '20px', margin: 'auto 0' }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container xs={12}>
                                            <Grid item xs={6}>
                                                <Typography variant="h4"> Votre avis </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Votre commentaire"
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} marginTop={3}>
                                            <Button variant="contained" color="secondary" onClick={handleCommentSubmit}>
                                                Soumettre
                                            </Button>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid> */}
                        </Grid>
                    </Grid>

                    {/* Comment Section */}
                    <Grid container spacing={2} xs={12} marginTop={3}>
                        <Card sx={{ width: '100%' }}>
                            <CardContent>
                                <Typography variant="h3">Donner votre avis</Typography>

                                <Grid container xs={12} spacing={2} marginTop={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h4"> Note </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Rating
                                            size="large"
                                            value={rating}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                            }}
                                            style={{ marginBottom: '20px', margin: 'auto 0' }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container xs={12}>
                                    <Grid item xs={6}>
                                        <Typography variant="h4"> Votre avis </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Votre commentaire"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} marginTop={3}>
                                    <Button variant="contained" color="secondary" onClick={handleCommentSubmit}>
                                        Soumettre
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </>
            ) : (
                <Typography variant="h6" color="error">
                    Cyber non trouvé.
                </Typography>
            )}
        </Container>
    );
};

// Define the prop types for validation
// cyberInfos.propTypes = {
//     cybers: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//             image: PropTypes.string.isRequired,
//             address: PropTypes.string.isRequired,
//             latitude: PropTypes.number.isRequired, // Added latitude for map
//             longitude: PropTypes.number.isRequired, // Added longitude for map
//             printers: PropTypes.number.isRequired,
//             typeOfPrinting: PropTypes.string.isRequired,
//             services: PropTypes.arrayOf(PropTypes.string).isRequired,
//             testimonials: PropTypes.arrayOf(
//                 PropTypes.shape({
//                     comment: PropTypes.string.isRequired,
//                     rating: PropTypes.number.isRequired
//                 })
//             ).isRequired
//         })
//     ).isRequired
// };

export default cyberInfos;
