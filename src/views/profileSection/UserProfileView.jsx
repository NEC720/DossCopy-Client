import React, { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import {
    Container,
    TextField,
    Button,
    Grid,
    Avatar,
    IconButton,
    MenuItem,
    // InputAdornment,
    Card,
    CardContent,
    Typography,
    Select,
    FormControl,
    InputLabel,
    Badge,
    Alert,
    Snackbar,
    AlertTitle,
    DialogActions,
    Checkbox,
    FormControlLabel,
    DialogContent,
    DialogTitle,
    Dialog
} from '@mui/material';
import { DeleteRounded, DoneAllRounded, Lock, PhotoCamera } from '@mui/icons-material';

import UserAccess from './components/UserAccess';
import StorageCard from './components/StorageCard';

import MoMoLogo from 'assets/images/paiement-logos/group_momo.png';
import AirtelLogo from 'assets/images/paiement-logos/airtel_money.png';
import PayPalLogo from 'assets/images/paiement-logos/PP_Acceptance_Marks_for_LogoCenter2.png';
import VisaLogo from 'assets/images/paiement-logos/visa_card.png';
import MasterCardLogo from 'assets/images/paiement-logos/master_card.png';

import { margin } from '@mui/system';

const UserProfileView = () => {
    const [formData, setFormData] = useState({
        firstName: 'Arthur',
        lastName: 'Nancy',
        password: '',
        email: 'bradley.ortiz@gmail.com',
        phone: '477-046-1827',
        address: '116 Jaskolski Stravonue Suite 883',
        nation: 'Congo',
        genre: 'Homme',
        language: 'Français',
        dobDay: '31',
        dobMonth: 'September',
        dobYear: '1990',
        twitter: 'twitter.com/envato',
        linkedIn: 'linkedIn/envato',
        facebook: 'facebook.com/envato',
        google: 'zachary Ruiz',
        slogan: 'Land acquisition Specialist',
        access: {
            level: 'standard',
            storage: 0.3
        },
        paymentMethods: [
            { type: 'MTN MoMo', logo: MoMoLogo, provider: 'MTN CG', last4: '8314', expires: '06/24' },
            { type: 'Airtel Money', logo: AirtelLogo, provider: 'Airtel CG', last4: '8314', expires: '05/25' },
            { type: 'PayPal', logo: PayPalLogo, provider: 'PayPal CG', last4: '8314', expires: '05/25' }
        ]
    });

    const [avatar, setAvatar] = useState(null); // État pour l'image uploadée
    const [firstName, setFirstName] = useState(`${formData.firstName}` || ''); // Par défaut, les valeurs du prénom
    const [lastName, setLastName] = useState(`${formData.lastName}` || ''); // et du nom
    const [initials, setInitials] = useState(`${firstName[0]}${lastName[0]}`);
    const [passwordFieldsVisible, setPasswordFieldsVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');
    const [alertTitle, setAlertTitle] = useState('Titre');
    const [birthDate, setBirthDate] = useState(new Date(2000, 0, 1)); // Date par défaut (01/01/1990)
    const [registrationDate, setRegistrationDate] = useState(new Date()); // Date actuelle par défaut

    // Charger l'avatar du localStorage si disponible
    useEffect(() => {
        console.log(formData, formData.genre, formData.language);
        const savedAvatar = localStorage.getItem('user-avatar');
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
    }, []);

    // Fonction pour gérer l'upload de fichier
    // const handleAvatarChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setAvatar(e.target.result); // Mise à jour de l'avatar avec l'image uploadée
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // Fonction pour gérer l'upload de fichier avec validation
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                setAvatar(result); // Mise à jour de l'avatar
                localStorage.setItem('user-avatar', result); // Sauvegarde de l'avatar dans le localStorage
            };
            reader.readAsDataURL(file);
        } else {
            alert('Seules les images au format JPEG ou PNG sont acceptées.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Fonction pour gérer le changement de mot de passe
    const handlePasswordChangeClick = () => {
        setPasswordFieldsVisible(true);
    };

    const handleClearPasswordFields = () => {
        setNewPassword('');
        setConfirmPassword('');
        setPasswordFieldsVisible(false);
    };

    const handleSavePassword = () => {
        if (newPassword && confirmPassword && newPassword === confirmPassword) {
            setAlertTitle('Nouveau mot de passe enregistré!');
            setToastMessage('Cliquez sur Enregistrer pour appliquer les modifications');
            setToastSeverity('success');
            setToastOpen(true);
            handleClearPasswordFields();
        } else if (!newPassword && !confirmPassword) {
            setAlertTitle('Nouveau mot de passe Vide!');
            setToastMessage("Veuillez saisir un nouveau mot de passe et confirmer le mot de passe. Ou annuler l'action");
            setToastSeverity('warning');
            setToastOpen(true);
        } else {
            setAlertTitle('Mots de passe différents!');
            setToastMessage('Les mots de passe ne sont pas identiques!');
            setToastSeverity('error');
            setToastOpen(true);
        }
    };

    //** Fonction pour gérer le changement de date de naissance */
    // Validation : Ne pas permettre une date de naissance future
    const handleBirthDateChange = (newValue) => {
        if (newValue > new Date()) {
            alert('La date de naissance ne peut pas être dans le futur.');
        } else {
            setBirthDate(newValue);
        }
    };

    // Validation : Date d'inscription ne peut pas être dans le futur
    const handleRegistrationDateChange = (newValue) => {
        if (newValue > new Date()) {
            alert("La date d'inscription ne peut pas être dans le futur.");
        } else {
            setRegistrationDate(newValue);
        }
    };

    // Fonction pour gérer la validation du formulaire
    const handleToastClose = () => {
        setToastOpen(false);
    };

    /** Methode de payement */
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMethods, setSelectedMethods] = useState([]);

    // Méthodes disponibles (y compris Visa et MasterCard)
    const availableMethods = [
        { type: 'Visa', logo: VisaLogo, provider: '', last4: '8314', expires: '06/24' },
        { type: 'MasterCard', logo: MasterCardLogo, provider: '', last4: '8314', expires: '06/24' },
        { type: 'MTN MoMo', logo: MoMoLogo, provider: 'MTN CG', last4: '8314', expires: '06/24' },
        { type: 'Airtel Money', logo: AirtelLogo, provider: 'Airtel CG', last4: '8314', expires: '06/24' },
        { type: 'PayPal', logo: PayPalLogo, provider: 'PayPal CG', last4: '8314', expires: '06/24' }
    ];

    // Ouvre la modale pour ajouter une méthode
    const handleAddPaymentMethodClick = () => {
        // Initialise les méthodes déjà présentes comme sélectionnées
        const alreadySelected = formData.paymentMethods.map((m) => m.type);
        setSelectedMethods(alreadySelected);
        setOpenDialog(true);
    };

    // Ferme la modale
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Gère la sélection/désélection des méthodes de paiement
    const handleMethodToggle = (methodType) => {
        if (selectedMethods.includes(methodType)) {
            setSelectedMethods(selectedMethods.filter((method) => method !== methodType));
        } else {
            setSelectedMethods([...selectedMethods, methodType]);
        }
    };

    // Ajoute les méthodes sélectionnées au tableau `paymentMethods`
    const handleAddSelectedMethods = () => {
        // Filtre les méthodes sélectionnées qui ne sont pas encore dans formData.paymentMethods
        const newMethods = availableMethods.filter(
            (method) => selectedMethods.includes(method.type) && !formData.paymentMethods.some((m) => m.type === method.type)
        );

        // Mise à jour du tableau avec les nouvelles méthodes ajoutées
        setFormData({ ...formData, paymentMethods: [...formData.paymentMethods, ...newMethods] });
        console.log('Updated Payment Methods:', formData.paymentMethods);
        setOpenDialog(false); // Fermer la boîte de dialogue après ajout
    };

    // Fonction pour gérer la suppression d'une méthode de paiement
    const handleRemovePaymentMethod = (index) => {
        const updatedMethods = [...formData.paymentMethods];
        updatedMethods.splice(index, 1);
        setFormData({ ...formData, paymentMethods: updatedMethods });
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h2" gutterBottom mb={4}>
                Edit Profile
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} align="center">
                    <Grid item>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <IconButton color="secondary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                                    <PhotoCamera />
                                </IconButton>
                            }
                        >
                            <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main', color: 'white' }} src={avatar}>
                                {!avatar && initials}
                            </Avatar>
                        </Badge>
                    </Grid>

                    <Grid item>
                        <Typography variant="h4">
                            {firstName} {lastName}
                        </Typography>
                    </Grid>

                    {/* Bouton pour afficher les champs de mot de passe */}
                    <Grid item>
                        <Button variant="contained" color="secondary" startIcon={<Lock />} onClick={handlePasswordChangeClick}>
                            Modifier le mot de passe
                        </Button>
                    </Grid>

                    {/* Champs pour changer le mot de passe, apparaissent seulement après le clic */}
                    {passwordFieldsVisible && (
                        <>
                            <Grid container gap={1} mt={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nouveau mot de passe"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirmer le nouveau mot de passe"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            {/* Boutons d'action */}
                            <Grid item container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <IconButton color="error" onClick={handleClearPasswordFields}>
                                        <DeleteRounded />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton color="success" onClick={handleSavePassword}>
                                        <DoneAllRounded />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12}>
                        <UserAccess accessLevel={formData.access.level} />
                    </Grid>

                    {/* Notification de succès/erreur */}
                    <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleToastClose} sx={{ width: '100%', textAlign: 'left' }}>
                        <Alert
                            onClose={handleToastClose}
                            severity={toastSeverity}
                            sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            <AlertTitle>{alertTitle}</AlertTitle>
                            {toastMessage}
                        </Alert>
                    </Snackbar>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                // InputProps={{
                                //     endAdornment: (
                                //         <InputAdornment position="end">
                                //             <Button>Change Password</Button>
                                //         </InputAdornment>
                                //     )
                                // }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Téléphone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Adresse" name="address" value={formData.address} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Pays" name="nation" value={formData.nation} onChange={handleChange} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="gender-label">Genre</InputLabel>
                                <Select labelId="gender-label" label="genre" name="genre" value={formData.genre} onChange={handleChange}>
                                    <MenuItem value="Homme">Homme</MenuItem>
                                    <MenuItem value="Femme">Femme</MenuItem>
                                    <MenuItem value="Outre">Outre</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                                <InputLabel id="Langue-label">Langue</InputLabel>
                                <Select
                                    labelId="Langue-label"
                                    label="Langue"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Français">Français</MenuItem>
                                    <MenuItem value="English">English</MenuItem>
                                    {/* Add other languages */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            fullWidth
                                            label="Date de naissance"
                                            value={birthDate}
                                            onChange={handleBirthDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                            inputFormat="dd/MM/yyyy" // Format de la date
                                            disableFuture // Désactive les dates futures
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <DatePicker
                                            label="Date d'inscription"
                                            value={registrationDate}
                                            onChange={handleRegistrationDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                            inputFormat="dd/MM/yyyy" // Format de la date
                                            maxDate={new Date()} // Empêche les dates futures
                                            disabled
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </LocalizationProvider>

                        <Grid item xs={12} mt={2}>
                            <StorageCard accessLevel={formData.access.level} storageUsed={formData.access.storage} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Payment Methods</Typography>
                            {formData.paymentMethods.map((method, index) => (
                                <Grid container justifyContent="space-between" alignItems="center" key={method.type} sx={{ mt: 2 }}>
                                    <Grid item xs={2}>
                                        {/* <Avatar src={method.logo} alt={`${method.type} logo`} */}
                                        <img
                                            src={method.logo}
                                            alt={`${method.type} logo`}
                                            style={{ width: 40, height: 40, borderRadius: '30%' }}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>
                                            <b>{method.type}</b>{' '}
                                            {method.provider && <i style={{ marginLeft: '5vw' }}>Par {method.provider}</i>}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button color="error" onClick={() => handleRemovePaymentMethod(index)}>
                                            Supprimer
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleAddPaymentMethodClick}>
                                Ajouter méthode de paiement
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Dialog pour ajouter une méthode de paiement */}
                    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                        <DialogTitle>Ajouter une méthode de paiement</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                {availableMethods.map((method /*, index*/) => (
                                    <Grid item xs={12} key={method.type}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedMethods.includes(method.type)}
                                                    onChange={() => handleMethodToggle(method.type)}
                                                    disabled={formData.paymentMethods.some((m) => m.type === method.type)}
                                                />
                                            }
                                            label={
                                                <Grid container alignItems="center">
                                                    <Avatar
                                                        src={method.logo}
                                                        alt={`${method.type} logo`}
                                                        style={{ width: 40, height: 40 }}
                                                    />
                                                    <Typography variant="body1" style={{ marginLeft: '1vw' }}>
                                                        {method.type}
                                                    </Typography>
                                                </Grid>
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="secondary">
                                Annuler
                            </Button>
                            <Button onClick={handleAddSelectedMethods} color="secondary" variant="contained">
                                Ajouter sélectionnées
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

                <Grid item xs={12} align="right">
                    <Button variant="contained" color="success">
                        Enregistrer
                    </Button>
                    <Button variant="contained" color="error" sx={{ ml: 2 }}>
                        Annuler
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserProfileView;
