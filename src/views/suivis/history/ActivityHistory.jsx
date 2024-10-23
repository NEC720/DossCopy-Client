import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    IconButton,
    LinearProgress,
    Tabs,
    Tab,
    Pagination,
    Grow,
    Slide,
    Tooltip,
    Divider,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import PrintIcon from '@mui/icons-material/Print';
import ArchiveIcon from '@mui/icons-material/Archive';
import CloudIcon from '@mui/icons-material/Cloud';
import { green, blue, red } from '@mui/material/colors';

const activities = [
    { type: 'impression', fileName: 'Document1.pdf', date: '16/10/2024', details: 'Imprimé en 3 exemplaires', size: '3 MB' },
    { type: 'upload', fileName: 'Image.png', date: '15/10/2024', details: 'Ajouté au stockage', size: '5 MB' },
    { type: 'suppression', fileName: 'OldFile.docx', date: '14/10/2024', details: 'Supprimé du stockage', size: '1 MB' },
    { type: 'impression', fileName: 'Presentation.pptx', date: '13/10/2024', details: 'Imprimé en couleur', size: '10 MB' },
    { type: 'upload', fileName: 'Backup.zip', date: '12/10/2024', details: 'Ajouté au stockage', size: '50 MB' }
];

// const storageLimit = 100; // Limite de stockage en MB
// const storageUsed = 69; // Stockage utilisé en MB

const ActivityHistory = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
            {/* Suivi du stockage */}
            {/* <Card sx={{ mb: 4, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Gestion du stockage
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
            </Card> */}

            {/* Onglets pour filtrer les activités */}
            <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3, '& .MuiTabs-flexContainer': { gap: '20px' } }}>
                <Tab label="Toutes les activités" />
                <Tab label="Impressions" />
                <Tab label="Stockage" />
            </Tabs>

            {/* Historique des activités */}
            <Slide direction="up" in={true} timeout={500}>
                <TableContainer component={Paper} elevation={4} sx={{ mb: 3 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: blue[100] }}>
                            <TableRow>
                                <TableCell>Type d’activité</TableCell>
                                <TableCell>Nom du fichier</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Détails</TableCell>
                                <TableCell>Taille</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activities
                                .filter((activity) => {
                                    if (activeTab === 1) return activity.type === 'impression';
                                    if (activeTab === 2) return activity.type !== 'impression';
                                    return true;
                                })
                                .map((activity, index) => (
                                    <Grow in={true} timeout={500 + index * 200} key={index}>
                                        <TableRow hover>
                                            <TableCell>
                                                <Tooltip title={activity.type === 'impression' ? 'Impression' : 'Stockage'} arrow>
                                                    <Avatar sx={{ bgcolor: activity.type === 'impression' ? green[500] : blue[500] }}>
                                                        {activity.type === 'impression' ? (
                                                            <PrintIcon color="secondary" />
                                                        ) : (
                                                            <ArchiveIcon color="secondary" />
                                                        )}
                                                    </Avatar>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{activity.fileName}</TableCell>
                                            <TableCell>{activity.date}</TableCell>
                                            <TableCell>{activity.details}</TableCell>
                                            <TableCell>{activity.size}</TableCell>
                                        </TableRow>
                                    </Grow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Slide>

            {/* Pagination */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Pagination count={5} color="primary" size="large" />
            </Grid>
        </Box>
    );
};

export default ActivityHistory;
