import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, LinearProgress, Tooltip, Badge, TextField } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { orange, yellow, blue, green, red, purple } from '@mui/material/colors';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import PaymentIcon from '@mui/icons-material/Payment';
import StoreIcon from '@mui/icons-material/Store';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, isSameDay } from 'date-fns';
import { style } from '@mui/system';
import { DateCalendar } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';

const userImpressions = [
    { date: '16/10/2024', count: 15 },
    { date: '15/10/2024', count: 12 },
    { date: '14/10/2024', count: 10 },
    { date: '13/10/2024', count: 20 },
    { date: '12/10/2024', count: 8 }
];

const paymentMethods = [
    {
        label: 'MTN MoMo',
        value: 72.72,
        color: yellow[700] // Jaune pour MTN MoMo
    },
    {
        label: 'Airtel Money',
        value: 16.38,
        color: red[500] // Rouge pour Airtel Money
    },
    {
        label: 'Paypal',
        value: 3.83,
        color: blue[500] // Bleu pour Paypal
    },
    {
        label: 'Master Card',
        value: 2.42,
        color: orange[500] // Orange pour Master Card
    },
    {
        label: 'Visa',
        value: 4.65,
        color: green[500] // Vert pour Visa
    }
];

const paymentPlaces = [
    { method: 'En ligne', count: 70 },
    { method: 'Sur place', count: 30 }
];

const top5Cybers = [
    { name: 'Cyber A', count: 40 },
    { name: 'Cyber B', count: 35 },
    { name: 'Cyber C', count: 25 },
    { name: 'Cyber D', count: 20 },
    { name: 'Cyber E', count: 15 }
];

const serviceUsage = [
    { service: 'Impressions', value: 50 },
    { service: 'Stockage', value: 30 },
    { service: 'Appels', value: 20 }
];

const planDaysUsed = 22; // Nombre de jours utilisés sur le plan de 30 jours
const valuePercentage = (planDaysUsed / 30) * 100;

const chartSetting = {
    yAxis: [
        {
            label: "Nombre d'impressions"
        }
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)'
        }
    },
    legend: {
        position: 'bottom'
    }
};

// Tableau des couleurs pour chaque méthode de paiement
// const methodColors = [green[500], yellow[700], blue[500], orange[500], red[500]];

const valueFormatter = (item) => `${item.value}%`;

// Paramètres du graphique en camembert
const pieChartSettings = {
    height: 300,
    series: [
        {
            data: paymentMethods.map((method, index) => ({
                id: method.label, // Utilise le label comme ID
                label: method.label, // Affiche le label de la méthode
                value: method.value, // La valeur de chaque méthode
                color: method.color // Applique la couleur associée à chaque méthode
            })),
            // Affichage du label
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
            // innerRadius: 30, // L'espace vide au milieu du graphe
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            // startAngle: -45, //  Déplace le début du graphique
            // endAngle: 225, //  Déplace la fin du graphique
            cx: 150,
            cy: 150,
            highlightScope: { fade: 'global', highlight: 'item' }, // Animation pour surligner les éléments
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }, // Animation de fade
            valueFormatter
        }
    ]
};

const top5ChartSetting = {
    yAxis: [
        {
            label: "Nombre d'utilisations"
        }
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)'
        }
    },
    legend: {
        position: 'bottom'
    }
};

const serviceUsageChartSettings = {
    height: 300,
    series: [
        {
            data: serviceUsage.map((service, index) => ({
                id: service.service,
                label: service.service,
                value: service.value,
                color: index === 0 ? blue[500] : index === 1 ? orange[500] : green[500] // Différentes couleurs par index
            })),
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 225,
            cx: 150,
            cy: 150,
            highlightScope: { fade: 'global', highlight: 'item' }, // Animation d'interaction
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter
        }
    ]
};

const bestPMChartSettings = {
    height: 300,
    series: [
        {
            data: paymentPlaces.map((method, index) => ({
                id: method.method,
                label: method.method,
                value: method.count,
                color: index === 0 ? purple[500] : blue[500] // Couleurs personnalisées
            })),
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            // startAngle: -45,
            // endAngle: 225,
            cx: 150,
            cy: 150,
            highlightScope: { fade: 'global', highlight: 'item' }, // Animation d'interaction
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter
        }
    ]
};

// calendar
const startDate = new Date(2024, 9, 1); // Date de début
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 30); // Date de fin après 30 jours
// { startDate, endDate }
console.log(startDate, endDate);

// Fonction pour normaliser les dates en supprimant l'heure
const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const CustomCalendar = () => {
    // Normaliser les dates
    const normalizedStartDate = normalizeDate(startDate);
    const normalizedEndDate = normalizeDate(endDate);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
                disablePast={false}
                sx={{
                    '& .MuiPickersDay-root': {
                        borderRadius: '50%',
                        padding: 1,
                        width: '40px',
                        height: '40px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)'
                        }
                    },
                    '& .Mui-selected': {
                        backgroundColor: blue[500],
                        color: '#fff'
                    },
                    '& .MuiPickersDay-root.Mui-selected:hover': {
                        transform: 'scale(1.2)'
                    },
                    '& .MuiDayPicker-weekDayLabel': {
                        fontWeight: 'bold',
                        color: blue[700]
                    }
                }}
                renderDay={(day, selectedDate, pickersDayProps) => {
                    const normalizedDay = normalizeDate(day);
                    const isStart = isSameDay(normalizedDay, normalizedStartDate);
                    const isEnd = isSameDay(normalizedDay, normalizedEndDate);

                    const highlightStyle = {
                        borderRadius: '50%',
                        padding: '10px',
                        backgroundColor: isStart ? green[500] : isEnd ? red[500] : pickersDayProps.selected ? blue[500] : '',
                        color: isStart || isEnd ? '#fff' : pickersDayProps.selected ? '#fff' : 'inherit',
                        textAlign: 'center',
                        fontWeight: isStart || isEnd ? 'bold' : 'normal',
                        border: isStart || isEnd ? `2px solid ${isStart ? green[700] : red[700]}` : 'none',
                        boxShadow: isStart || isEnd ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '',
                        transform: isStart || isEnd ? 'scale(1.2)' : 'none'
                    };

                    return <div style={highlightStyle}>{isStart ? 'Début' : isEnd ? 'Fin' : format(day, 'd')}</div>;
                }}
            />
        </LocalizationProvider>
    );
};
// Validation des types de props
// CustomCalendar.propTypes = {
//     startDate: PropTypes.instanceOf(Date).isRequired,
//     endDate: PropTypes.instanceOf(Date).isRequired
// };

// { planDaysUsed, valuePercentage, startDate, endDate }
const StatisticsPage = () => {
    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
                Tableau de bord des statistiques
            </Typography>

            <Grid container spacing={4}>
                {/* Stats des impressions */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: blue[700] }}>
                                Impressions de l'utilisateur
                            </Typography>
                            <Box sx={{ width: '100%', height: 300 }}>
                                <BarChart
                                    dataset={userImpressions}
                                    xAxis={[{ scaleType: 'band', dataKey: 'date', label: 'Date' }]}
                                    borderRadius={5}
                                    series={[{ dataKey: 'count', label: 'Impressions', color: blue[500] }]}
                                    {...chartSetting}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Moyens de paiement */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: green[700] }}>
                                Moyens de paiement utilisés
                            </Typography>
                            <Box sx={{ width: '100%', height: 300 }}>
                                <PieChart {...pieChartSettings} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top 5 cybers les plus utilisés */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: orange[700] }}>
                                Top 5 cybers les plus utilisés
                            </Typography>
                            <Box sx={{ width: '100%', height: 300 }}>
                                <BarChart
                                    dataset={top5Cybers}
                                    xAxis={[{ scaleType: 'band', dataKey: 'name', label: 'Cybercafé' }]}
                                    series={[{ dataKey: 'count', label: 'Utilisations', color: orange[500] }]}
                                    borderRadius={5}
                                    {...top5ChartSetting}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Comparatif des paiements */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: purple[700] }}>
                                Paiements en ligne vs sur place
                            </Typography>
                            <Box sx={{ width: '100%', height: 300 }}>
                                <PieChart {...bestPMChartSettings} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Gauge pour le plan de l'utilisateur */}
                <Grid item xs={12}>
                    <Card elevation={3} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, mb: 4 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: blue[700] }}>
                                Statut du plan de l&apos;utilisateur (30 jours)
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                {/* Calendrier */}
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" justifyContent="center">
                                        <CustomCalendar startDate={startDate} endDate={endDate} />
                                    </Box>
                                </Grid>

                                {/* Gauge et texte */}
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                                        <Gauge
                                            value={valuePercentage}
                                            min={0}
                                            max={100}
                                            startAngle={-110}
                                            endAngle={110}
                                            width={window.innerWidth < 600 ? 200 : 300} // Responsive width
                                            height={window.innerWidth < 600 ? 150 : 200} // Responsive height
                                            sx={{
                                                [`& .${gaugeClasses.valueText}`]: {
                                                    fontSize: window.innerWidth < 600 ? 30 : 40, // Adjust font size based on screen width
                                                    transform: 'translate(0px, 0px)'
                                                }
                                            }}
                                            color={valuePercentage > 80 ? red[500] : green[500]}
                                            text={`${planDaysUsed}jrs / 30jrs`}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
                                            <Typography variant="h5">
                                                Jours utilisés : <span style={{ color: 'blue', fontWeight: 'bold' }}>{planDaysUsed}</span>
                                            </Typography>
                                            <Typography variant="h5">
                                                Jours restants :{' '}
                                                <span style={{ color: 'red', fontWeight: 'bold' }}>{30 - planDaysUsed}</span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* PieChart des services utilisés */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: red[700] }}>
                                Utilisation des services
                            </Typography>
                            <Box sx={{ width: '100%', height: 300 }}>
                                <PieChart {...serviceUsageChartSettings} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

// Validation des types de props pour PlanStatusCard (en option si nécessaire)
// StatisticsPage.propTypes = {
//     planDaysUsed: PropTypes.number.isRequired,
//     valuePercentage: PropTypes.number.isRequired,
//     startDate: PropTypes.instanceOf(Date).isRequired,
//     endDate: PropTypes.instanceOf(Date).isRequired
// };

export default StatisticsPage;
