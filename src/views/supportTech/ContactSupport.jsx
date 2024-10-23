import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Divider,
    Snackbar,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { blue } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ContactSupport = () => {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleSubmit = () => {
        // Logique d'envoi de message ici...
        setOpenSnackbar(true);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
                Contacter le Support
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4, textAlign: 'center' }}>
                Si vous avez des questions ou des préoccupations, n&apos;hésitez pas à nous contacter.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Envoyez-nous un message
                            </Typography>
                            <TextField label="Nom" variant="outlined" fullWidth margin="normal" />
                            <TextField label="Email" variant="outlined" fullWidth margin="normal" type="email" />
                            <TextField label="Message" variant="outlined" fullWidth margin="normal" multiline rows={4} />
                            <Button
                                variant="contained"
                                sx={{
                                    marginTop: 2,
                                    backgroundColor: blue[500],
                                    '&:hover': { backgroundColor: blue[700] }
                                }}
                                fullWidth
                                onClick={handleSubmit}
                            >
                                Envoyer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Informations de Contact
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon sx={{ marginRight: 1, color: 'green' }} />
                                Téléphone : <a href="tel:+123456789">+123 456 789</a>
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ marginRight: 1, color: 'mediumblue' }} />
                                Email : <a href="mailto:support@example.com">support@example.com</a>
                            </Typography>
                            <Divider sx={{ my: 4 }} />
                            <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                FAQ
                            </Typography>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="body2">Q1 : Comment réinitialiser mon mot de passe ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>R : Cliquez sur &quot;Mot de passe oublié&quot; sur la page de connexion.</Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="body2">Q2 : Où puis-je trouver mes factures ?</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>R : Allez dans votre compte, section &quot;Factures&quot;.</Typography>
                                </AccordionDetails>
                            </Accordion>
                            {/* Ajoutez d'autres questions FAQ ici */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message="Votre message a été envoyé avec succès !"
            />
        </Box>
    );
};

export default ContactSupport;
