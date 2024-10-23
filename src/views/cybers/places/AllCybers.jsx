import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Rating,
    Button,
    TextField,
    Pagination,
    Select,
    MenuItem,
    Slide,
    Fade,
    IconButton
} from '@mui/material';
import { Search, Close, Info, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const AllCybers = ({ cybers }) => {
    const [selectedCyber, setSelectedCyber] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [page, setPage] = useState(1);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [keyword, setKeyword] = useState(''); // Nouvelle variable d'état pour le mot-clé
    const [statusFilter, setStatusFilter] = useState('All'); // Nouvelle variable d'état pour le statut
    const theme = useTheme();
    const navigate = useNavigate(); // Hook for navigation
    const itemsPerPage = 6; // Nombre d'éléments à afficher par page

    // Calcul des cybers filtrés par mots-clés, statut, et rating
    const filteredCybers = cybers.filter((cyber) => {
        const matchesKeyword =
            cyber.name.toLowerCase().includes(keyword.toLowerCase()) || cyber.address.toLowerCase().includes(keyword.toLowerCase());
        const matchesStatus = statusFilter === 'All' || cyber.status === statusFilter;
        const matchesRating = cyber.rating >= ratingFilter;

        return matchesKeyword && matchesStatus && matchesRating;
    });

    // Calcul des pages
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCybers = filteredCybers.slice(indexOfFirstItem, indexOfLastItem);

    const handleViewDetails = (cyber) => {
        setSelectedCyber(cyber);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedCyber(null);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleRatingFilterChange = (event) => {
        setRatingFilter(event.target.value);
        setPage(1); // Reset pagination when filter changes
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
        setPage(1); // Reset pagination when keyword changes
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
        setPage(1); // Reset pagination when status changes
    };

    const handleNavigateToCyberInfos = () => {
        navigate('/cybers/cyberInfos', { state: { selectedCyber } });
    };

    const handlePreviousCyber = () => {
        if (selectedCyber) {
            const currentIndex = filteredCybers.findIndex((cyber) => cyber.id === selectedCyber.id);
            if (currentIndex > 0) {
                setSelectedCyber(filteredCybers[currentIndex - 1]);
            }
        }
    };

    const handleNextCyber = () => {
        if (selectedCyber) {
            const currentIndex = filteredCybers.findIndex((cyber) => cyber.id === selectedCyber.id);
            if (currentIndex < filteredCybers.length - 1) {
                setSelectedCyber(filteredCybers[currentIndex + 1]);
            }
        }
    };

    const isFirstCyber = selectedCyber && filteredCybers.findIndex((cyber) => cyber.id === selectedCyber.id) === 0;
    const isLastCyber = selectedCyber && filteredCybers.findIndex((cyber) => cyber.id === selectedCyber.id) === filteredCybers.length - 1;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                height: '100vh',
                backgroundColor: '#f0f2f5',
                padding: '20px',
                paddingRight: 0
            }}
        >
            {/* 1st Part: Filters */}
            <div
                style={{
                    width: '20%',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: theme.shadows[3],
                    height: '70vh'
                }}
            >
                <TextField
                    label="Rechercher"
                    variant="outlined"
                    fullWidth
                    value={keyword} // Liaison de l'état du mot-clé
                    onChange={handleKeywordChange} // Gestion du changement du mot-clé
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <Search />
                            </IconButton>
                        )
                    }}
                    style={{ marginBottom: '20px' }}
                />
                <Select
                    fullWidth
                    defaultValue="All"
                    value={statusFilter} // Liaison de l'état du statut
                    onChange={handleStatusFilterChange} // Gestion du changement de statut
                    style={{ marginBottom: '20px' }}
                >
                    <MenuItem value="All">Tous</MenuItem>
                    <MenuItem value="Open">Ouvert</MenuItem>
                    <MenuItem value="Closed">Fermer</MenuItem>
                </Select>
                <Typography variant="body1">Filter by Rating</Typography>
                <Rating value={ratingFilter} precision={0.5} onChange={handleRatingFilterChange} style={{ marginBottom: '20px' }} />
            </div>

            {/* 2nd Part: List of Cybers */}
            <Fade in={true} timeout={500}>
                <Grid
                    container
                    spacing={3}
                    style={{
                        width: openDetails ? '60%' : '80%',
                        transition: 'width 0.5s ease',
                        padding: '20px',
                        maxHeight: '80vh', // Limite la hauteur pour éviter les débordements
                        overflowY: 'auto' // Ajoute un défilement si nécessaire
                    }}
                >
                    {currentCybers.map((cyber) => (
                        <Grid
                            item
                            xs={12}
                            sm={openDetails ? 6 : 4} // Change layout when details are open
                            key={cyber.id}
                        >
                            <Card
                                style={{
                                    transition: 'transform 0.4s, box-shadow 0.4s',
                                    borderRadius: '15px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(10px)',
                                    border: selectedCyber?.id === cyber.id ? `2px solid ${theme.palette.primary.main}` : 'none', // Highlight selected card
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: theme.shadows[10]
                                    },
                                    height: '350px', // Hauteur uniforme des cartes
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={cyber.image}
                                    alt={cyber.name}
                                    style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                                />
                                <CardContent style={{ padding: '20px', flexGrow: 1 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {cyber.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {cyber.address}
                                    </Typography>
                                    <Rating value={cyber.rating} precision={0.5} readOnly size="small" />
                                    <Chip
                                        label={cyber.status}
                                        color={cyber.status === 'Open' ? 'success' : 'error'}
                                        style={{ marginTop: '10px', fontWeight: 'bold' }}
                                    />
                                </CardContent>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleViewDetails(cyber)}
                                    startIcon={<Info />}
                                    style={{
                                        margin: '10px 20px',
                                        borderRadius: '10px',
                                        padding: '10px 20px',
                                        fontSize: '0.9rem',
                                        textTransform: 'none',
                                        transition: 'background-color 0.3s, transform 0.3s',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                            transform: 'translateY(-3px)'
                                        }
                                    }}
                                >
                                    Voir Details
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                    {/* Pagination */}
                    <Pagination
                        count={Math.ceil(filteredCybers.length / itemsPerPage)}
                        color="secondary"
                        page={page}
                        onChange={handleChangePage}
                        style={{
                            marginTop: '5vh',
                            marginBottom: 0,
                            marginRight: '5vh',
                            marginLeft: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </Grid>
            </Fade>

            {/* 3rd Part: Cyber Details */}
            <Slide direction="left" in={openDetails} mountOnEnter unmountOnExit>
                <div
                    style={{
                        width: '25%',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '15px',
                        boxShadow: theme.shadows[5],
                        maxHeight: '70vh', // Limite la hauteur pour éviter les débordements
                        overflowY: 'auto' // Ajoute un défilement si nécessaire
                    }}
                >
                    {selectedCyber && (
                        <>
                            {/* Chevrons */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <IconButton
                                        onClick={handlePreviousCyber}
                                        disabled={isFirstCyber}
                                        style={{ color: isFirstCyber ? theme.palette.grey[400] : theme.palette.secondary.main }}
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNextCyber}
                                        disabled={isLastCyber}
                                        style={{ color: isLastCyber ? theme.palette.grey[400] : theme.palette.secondary.main }}
                                    >
                                        <ChevronRight />
                                    </IconButton>
                                </div>
                                <IconButton onClick={handleCloseDetails}>
                                    <Close />
                                </IconButton>
                            </div>
                            {/* Details */}
                            <CardMedia
                                component="img"
                                height="180"
                                image={selectedCyber.image}
                                alt={selectedCyber.name}
                                style={{ borderRadius: '10px', marginBottom: '20px' }}
                            />
                            <Typography variant="h5" fontWeight="bold" style={{ marginBottom: '10px' }}>
                                {selectedCyber.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                                {selectedCyber.description}
                            </Typography>
                            <Typography variant="body1" style={{ marginBottom: '10px' }}>
                                Adresse: {selectedCyber.address}
                            </Typography>
                            <Typography variant="body1" style={{ marginBottom: '10px' }}>
                                Avis: <Rating value={selectedCyber.rating} readOnly />
                            </Typography>
                            <Chip
                                label={selectedCyber.status}
                                color={selectedCyber.status === 'Open' ? 'success' : 'error'}
                                style={{ margin: '10px 0', fontWeight: 'bold' }}
                            />
                            <Typography variant="body2" style={{ margin: '10px 0' }}>
                                Imprimantes: {selectedCyber.printers}
                            </Typography>
                            <Typography variant="body2" style={{ margin: '10px 0' }}>
                                Services: {selectedCyber.services.join(', ')}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleNavigateToCyberInfos}
                                style={{
                                    marginTop: '20px',
                                    width: '100%',
                                    fontSize: '0.9rem',
                                    borderRadius: '10px',
                                    padding: '10px 20px',
                                    textTransform: 'none'
                                }}
                            >
                                En savoir plus
                            </Button>
                        </>
                    )}
                </div>
            </Slide>
        </div>
    );
};

// Define the prop types for validation
AllCybers.propTypes = {
    cybers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default AllCybers;
