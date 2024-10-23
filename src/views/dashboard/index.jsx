import { useEffect, useState } from 'react';

// material-ui
// import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { Card, CardContent, Typography, Box, CircularProgress, Grid, LinearProgress } from '@mui/material';

import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts';
import { orange, yellow, blue, green, red, purple } from '@mui/material/colors';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    // to delete
    const storageLimit = 100; // Limite de stockage en MB
    const storageUsed = 69; // Stockage utilisé en MB
    const activities = [
        { type: 'impression', fileName: 'Document1.pdf', date: '16/10/2024', details: 'Imprimé en 3 exemplaires', size: '3 MB' },
        { type: 'upload', fileName: 'Image.png', date: '15/10/2024', details: 'Ajouté au stockage', size: '5 MB' },
        { type: 'suppression', fileName: 'OldFile.docx', date: '14/10/2024', details: 'Supprimé du stockage', size: '1 MB' },
        { type: 'impression', fileName: 'Presentation.pptx', date: '13/10/2024', details: 'Imprimé en couleur', size: '10 MB' },
        { type: 'upload', fileName: 'Backup.zip', date: '12/10/2024', details: 'Ajouté au stockage', size: '50 MB' }
    ];

    // Données simulées pour les impressions des 7 derniers jours
    const impressionsData = [
        { date: '2024-10-11', impressions: 150 },
        { date: '2024-10-12', impressions: 180 },
        { date: '2024-10-13', impressions: 120 },
        { date: '2024-10-14', impressions: 210 },
        { date: '2024-10-15', impressions: 250 },
        { date: '2024-10-16', impressions: 230 },
        { date: '2024-10-17', impressions: 190 }
    ];

    const lineChartSettings = {
        height: 300,
        width: 500,
        xAxis: [
            {
                scaleType: 'band',
                dataKey: 'date',
                label: 'Date' // Affiche la date sur l'axe des abscisses
            }
        ],
        yAxis: [
            {
                label: "Nombre d'impressions", // Affiche 'Nombre d'impressions' sur l'axe des ordonnées
                scaleType: 'linear'
            }
        ]
    };

    const valueFormatter = (item) => `${item.value}%`;

    const serviceUsage = [
        { service: 'Impressions', value: 50 },
        { service: 'Stockage', value: 30 },
        { service: 'Appels', value: 20 }
    ];

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

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                                {/* Suivi du stockage */}
                                <Card sx={{ mb: 4, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                                    <CardContent>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            Stockage
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                                            <CloudIcon sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
                                            <Typography variant="body1">{`Stockage utilisé : ${storageUsed} MB / ${storageLimit} MB`}</Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(storageUsed / storageLimit) * 100}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                '& .MuiLinearProgress-bar': { backgroundColor: green[500] }
                                            }}
                                        />
                                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
                                            <Typography variant="body2">Espace restant : {storageLimit - storageUsed} MB</Typography>
                                            <Typography variant="body2">Total fichiers : {activities.length}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {/* <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard
                                    {...{
                                        isLoading: isLoading,
                                        total: 203,
                                        label: 'Total Income',
                                        icon: <StorefrontTwoToneIcon fontSize="inherit" />
                                    }}
                                />
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Box sx={{}}>
                            <Card sx={{ mb: 4, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                                <CardContent>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        Nombre d&apos;impression de ces derniers jours
                                    </Typography>
                                    <LineChart
                                        dataset={impressionsData}
                                        series={[
                                            {
                                                dataKey: 'impressions',
                                                label: 'Impressions',
                                                color: blue[500] // Couleur de la ligne
                                            }
                                        ]}
                                        {...lineChartSettings}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
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
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
