import React, { useEffect, useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Grid,
    Avatar,
    IconButton,
    MenuItem,
    InputAdornment,
    Card,
    CardContent,
    Typography,
    Select,
    FormControl,
    InputLabel,
    Badge,
    Alert,
    Snackbar,
    AlertTitle
} from '@mui/material';
import { AlignHorizontalCenter, DeleteRounded, DoneAllRounded, Lock, PhotoCamera } from '@mui/icons-material';

const UserProfileView = () => {
    const [formData, setFormData] = useState({
        firstName: 'Arthur',
        lastName: 'Nancy',
        password: '',
        email: 'bradley.ortiz@gmail.com',
        phone: '477-046-1827',
        address: '116 Jaskolski Stravonue Suite 883',
        nation: 'Congo',
        gender: 'Homme',
        language: 'Français',
        dobDay: '31',
        dobMonth: 'September',
        dobYear: '1990',
        twitter: 'twitter.com/envato',
        linkedIn: 'linkedIn/envato',
        facebook: 'facebook.com/envato',
        google: 'zachary Ruiz',
        slogan: 'Land acquisition Specialist',
        paymentMethods: [
            { type: 'Visa', last4: '8314', expires: '06/24' },
            { type: 'MasterCard', last4: '8314', expires: '05/25' }
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

    // Charger l'avatar du localStorage si disponible
    useEffect(() => {
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

    const handleToastClose = () => {
        setToastOpen(false);
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
                        <Typography variant="h6">
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
                                <InputLabel>Gender</InputLabel>
                                <Select name="gender" value={formData.gender} onChange={handleChange}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} mt={2}>
                            <FormControl fullWidth>
                                <InputLabel>Language</InputLabel>
                                <Select name="language" value={formData.language} onChange={handleChange}>
                                    <MenuItem value="English">Français</MenuItem>
                                    <MenuItem value="Spanish">English</MenuItem>
                                    {/* Add other languages */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <TextField label="Day" name="dobDay" value={formData.dobDay} onChange={handleChange} select fullWidth>
                                        <MenuItem value="31">31</MenuItem>
                                        {/* Add other days */}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        label="Month"
                                        name="dobMonth"
                                        value={formData.dobMonth}
                                        onChange={handleChange}
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value="September">September</MenuItem>
                                        {/* Add other months */}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField
                                        label="Year"
                                        name="dobYear"
                                        value={formData.dobYear}
                                        onChange={handleChange}
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value="1990">1990</MenuItem>
                                        {/* Add other years */}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Payment Methods</Typography>
                            {formData.paymentMethods.map((method, index) => (
                                <Grid container justifyContent="space-between" alignItems="center" key={index} sx={{ mt: 2 }}>
                                    <Typography>
                                        {method.type} ...{method.last4} (Expires {method.expires})
                                    </Typography>
                                    <Button color="error">Supprimer</Button>
                                </Grid>
                            ))}
                            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                                Ajouter méthode de payement
                            </Button>
                        </CardContent>
                    </Card>
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
