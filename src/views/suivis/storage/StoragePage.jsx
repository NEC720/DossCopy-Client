import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, Container, Card, CardContent, LinearProgress, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import FileExplorer from './FileExplorer'; // Ton File Explorer importé

import CloudIcon from '@mui/icons-material/Cloud';
import { green, blue, red } from '@mui/material/colors';

import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Styles modernes pour le conteneur de la page
const PageContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4)
}));

// Grid container moderne pour l'affichage des fichiers
const FileGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    justifyContent: 'flex-start'
}));

// Card moderne pour chaque répertoire/fichier
const FileCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    width: '150px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)'
    }
}));

//=================
const activities = [
    { type: 'impression', fileName: 'Document1.pdf', date: '16/10/2024', details: 'Imprimé en 3 exemplaires', size: '3 MB' },
    { type: 'upload', fileName: 'Image.png', date: '15/10/2024', details: 'Ajouté au stockage', size: '5 MB' },
    { type: 'suppression', fileName: 'OldFile.docx', date: '14/10/2024', details: 'Supprimé du stockage', size: '1 MB' },
    { type: 'impression', fileName: 'Presentation.pptx', date: '13/10/2024', details: 'Imprimé en couleur', size: '10 MB' },
    { type: 'upload', fileName: 'Backup.zip', date: '12/10/2024', details: 'Ajouté au stockage', size: '50 MB' }
];

const storageLimit = 100; // Limite de stockage en MB
const storageUsed = 69; // Stockage utilisé en MB

export default function StoragePage() {
    const [selectedFolder, setSelectedFolder] = useState('Accueil');

    const fileGroups = [
        { label: 'Documents', icon: <FolderIcon sx={{ fontSize: 40 }} /> },
        { label: 'Images', icon: <ImageIcon sx={{ fontSize: 40 }} /> },
        { label: 'Musiques', icon: <MusicNoteIcon sx={{ fontSize: 40 }} /> },
        { label: 'Vidéos', icon: <VideoLibraryIcon sx={{ fontSize: 40 }} /> },
        { label: 'Ajouts récents', icon: <UploadFileIcon sx={{ fontSize: 40 }} /> },
        { label: 'Corbeille', icon: <RestoreFromTrashIcon sx={{ fontSize: 40 }} /> }
    ];

    // Exemple de contenu d'accueil affiché lorsque rien n'est sélectionné
    const welcomeContent = (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Bienvenue dans votre espace de stockage !
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>
                Sélectionnez un dossier à gauche pour afficher son contenu ou explorez vos groupes de fichiers.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {fileGroups.map((group) => (
                    <Grid item xs={12} sm={6} md={4} key={group.label}>
                        <Card
                            sx={{
                                transition: 'transform 0.3s',
                                '&:hover': { transform: 'scale(1.05)' },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: 2,
                                borderRadius: 4,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Box sx={{ color: 'primary.main', mb: 2 }}>{group.icon}</Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {group.label}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Divider section for actions */}
            <Divider sx={{ my: 4 }} />

            {/* Actions */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    Actions
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<AddCircleIcon />}
                            sx={{
                                borderRadius: 3,
                                px: 3,
                                py: 1.5,
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            Créer un dossier
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                            sx={{
                                borderRadius: 3,
                                px: 3,
                                py: 1.5,
                                transition: 'border-color 0.3s',
                                '&:hover': {
                                    borderColor: 'primary.main'
                                }
                            }}
                        >
                            Uploader un fichier
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    // Simule l'affichage du contenu en fonction du dossier sélectionné
    const fileContent = (
        <FileGrid container>
            {/* Exemple de containers cliquables pour Documents, Images, Musiques, etc. */}
            <FileCard onClick={() => setSelectedFolder('Documents')}>
                <Typography>Documents</Typography>
            </FileCard>
            <FileCard onClick={() => setSelectedFolder('Images')}>
                <Typography>Images</Typography>
            </FileCard>
            <FileCard onClick={() => setSelectedFolder('Musiques')}>
                <Typography>Musiques</Typography>
            </FileCard>
            <FileCard onClick={() => setSelectedFolder('Vidéos')}>
                <Typography>Vidéos</Typography>
            </FileCard>
            <FileCard onClick={() => setSelectedFolder('Ajouts récents')}>
                <Typography>Ajouts récents</Typography>
            </FileCard>
        </FileGrid>
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {/* Suivi du stockage */}
                <Card sx={{ mb: 4, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
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
                </Card>
            </Grid>
            <Grid item xs={12}>
                <PageContainer sx={{ margin: 0, width: '100%' }}>
                    {/* Colonne de gauche: File Explorer */}
                    <Box sx={{ flexBasis: '30%', paddingRight: 2 }}>
                        <FileExplorer onFolderSelect={setSelectedFolder} />
                    </Box>

                    {/* Colonne de droite: Contenu qui change en fonction du dossier sélectionné */}
                    <Box sx={{ flexBasis: '70%', backgroundColor: 'white', borderRadius: 2, padding: 3 }}>
                        {selectedFolder === 'Accueil' ? welcomeContent : fileContent}
                    </Box>
                </PageContainer>
            </Grid>
        </Grid>
    );
}
