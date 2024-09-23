import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Avatar,
    IconButton,
    Toolbar,
    AppBar,
    CircularProgress,
    Container,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Tooltip
} from '@mui/material';
import { CopyAll as CopyIcon, Lock as LockIcon, PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
// import { ChangeProfilePasswordForm } from '../../components/library/change-profile-password-form/ChangeProfilePasswordForm';
import { useScreenSize } from '../utilities/media-query';
import { getSupervisors, getProfile, updateProfile } from 'services/apiProfilService'; // Assure-toi que ces fonctions correspondent à tes API

const PROFILE_ID = 89;

const copyToClipboard = (text) => () => {
    navigator.clipboard.writeText(text);
    alert('Text copied');
};

const formatPhone = (value) => {
    return String(value).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
};

export const UserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [supervisors, setSupervisors] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // const [isChangePasswordPopupOpened, setIsChangedPasswordPopupOpened] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);

    const [avatar, setAvatar] = useState(profileData?.picture);
    const [firstName, setFirstName] = useState(profileData?.first_name || '');
    const [lastName, setLastName] = useState(profileData?.name || '');
    // Obtenir la date d'aujourd'hui au format AAAA-MM-JJ
    const [birthDate, setBirthDate] = useState(profileData?.birthDate || new Date().toISOString().split('T')[0]);
    // const [hover, setHover] = useState(false);
    const [access, setAccess] = useState(profileData?.access || 'Standard');

    const { isXSmall } = useScreenSize();

    const fetchData = async () => {
        setIsLoading(true);
        const supervisorsList = await getSupervisors();
        const profile = await getProfile(PROFILE_ID);
        setSupervisors(supervisorsList['data']);
        setProfileData(profile);
        setSelectedSupervisor(profile.supervisorId || '');
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        const updatedData = {
            ...profileData,
            supervisorId: selectedSupervisor
        };
        await updateProfile(updatedData);
        alert('Profile saved successfully');
        setIsDataChanged(false);
    };

    const handleCancel = () => {
        fetchData(); // Recharger les données d'origine
        setIsDataChanged(false);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handleChangePasswordClick = () => {
        setIsChangedPasswordPopupOpened(true);
    };

    const handleFieldChange = (field) => (e) => {
        setProfileData({ ...profileData, [field]: e.target.value });
        setIsDataChanged(true);
    };

    const handleSupervisorChange = (event) => {
        setSelectedSupervisor(event.target.value);
        setIsDataChanged(true);
    };

    if (isLoading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h3" sx={{ flexGrow: 1 }}>
                        User Profile
                    </Typography>
                    <Button onClick={handleCancel} disabled={!isDataChanged} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={!isDataChanged} variant="contained" color="primary">
                        Save
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {/* Basic Info */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                    <Tooltip title="Edit Photo">
                                        <label htmlFor="avatar-upload">
                                            <input
                                                accept="image/*"
                                                id="avatar-upload"
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleAvatarChange}
                                            />
                                            <IconButton component="span">
                                                <Avatar
                                                    alt={profileData?.name}
                                                    src={avatar}
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        '&:hover': {
                                                            cursor: 'pointer',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <PhotoCameraIcon />
                                                </Avatar>
                                            </IconButton>
                                        </label>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h5">{profileData?.name}</Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        ID: {profileData?.id}
                                        <IconButton onClick={copyToClipboard(profileData?.id)}>
                                            <CopyIcon fontSize="small" />
                                        </IconButton>
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        startIcon={isXSmall ? null : <LockIcon />}
                                        onClick={handleChangePasswordClick}
                                    >
                                        Change Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contact Info */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Contact Information</Typography>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formatPhone(profileData?.phone)}
                                onChange={handleFieldChange('phone')}
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={copyToClipboard(profileData?.phone)}>
                                            <CopyIcon fontSize="small" />
                                        </IconButton>
                                    )
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                value={profileData?.email}
                                onChange={handleFieldChange('email')}
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={copyToClipboard(profileData?.email)}>
                                            <CopyIcon fontSize="small" />
                                        </IconButton>
                                    )
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Général Info */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Générale</Typography>
                            <FormControl fullWidth margin="normal">
                                {/* First Name and Last Name on the first row */}
                                <Grid container spacing={2}>
                                    {/* First Name and Last Name on the first line */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Prénom(s)"
                                            variant="outlined"
                                            fullWidth
                                            value={profileData?.first_name || ''}
                                            onChange={(e) => setFirstName(e.target.value)} // Met à jour la valeur du prénom
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Nom"
                                            variant="outlined"
                                            fullWidth
                                            value={profileData?.name || ''}
                                            onChange={(e) => setLastName(e.target.value)} // Met à jour la valeur du nom
                                        />
                                    </Grid>

                                    {/* Birth Date and Access on the second line */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Date de naissance"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(e.target.value)} // Met à jour la date de naissance
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Niveau d'accès"
                                            variant="outlined"
                                            fullWidth
                                            value={access}
                                            InputProps={{
                                                readOnly: true // Champ non modifiable
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Address Info */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Addresse</Typography>
                            <TextField
                                fullWidth
                                label="Rue"
                                value={profileData?.address}
                                onChange={handleFieldChange('address')}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Ville"
                                value={profileData?.city || 'Brazzaville'}
                                onChange={handleFieldChange('city')}
                                margin="normal"
                            />
                            {/* <TextField
                                fullWidth
                                label="Departement"
                                value={profileData?.state}
                                onChange={handleFieldChange('state')}
                                margin="normal"
                            /> */}
                            <TextField
                                fullWidth
                                label="Pays"
                                value={profileData?.country || 'Congo'}
                                onChange={handleFieldChange('country')}
                                margin="normal"
                                InputProps={{
                                    readOnly: true // Champ non modifiable
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Change Password Form */}
            {/* <ChangeProfilePasswordForm visible={isChangePasswordPopupOpened} setVisible={setIsChangedPasswordPopupOpened} /> */}
        </Container>
    );
};
