import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// project imports
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';

// services
import api from 'services/api';
import { toast } from 'react-toastify';

const AuthRegister = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const navigate = useNavigate();

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First name is required').max(255),
        name: Yup.string().required('Last name is required').max(255),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Password confirmation is required'),
        phone: Yup.string().required('Phone number is required'),
        adresse: Yup.string().required('Address is required'),
        checked: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
    });

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            first_name: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '',
            adresse: '',
            checked: true
        }
    });

    const onSubmit = async (data) => {
        console.log('Submitting form data: ', data);
        try {
            const resp = await api.post('/auth/register', data);

            if (resp.data.status === 'success') {
                toast.success(resp.data.message);
                navigate('/inscription/verification-email', {
                    state: { responseData: resp.data }
                });
            } else {
                toast.error('Cette adresse mail est déjà utilisée!');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setError('submit', { message: error.response.data.message });
            } else {
                setError('submit', { message: 'Une erreur est survenue. Veuillez réessayer.' });
            }
        }
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.grey[50],
                                borderColor: theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            S'inscrire avec Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OU
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">S'inscrire avec l'adresse e-mail</Typography>
                    </Box>
                </Grid>
            </Grid>

            <form noValidate onSubmit={handleSubmit(onSubmit)} {...others}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="first_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Prénom"
                                    margin="normal"
                                    error={!!errors.fname}
                                    helperText={errors.fname?.message}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nom"
                                    margin="normal"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.email} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Adresse</InputLabel>
                            <OutlinedInput {...field} type="email" id="outlined-adornment-email-register" />
                            {errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.phone} sx={{ ...theme.typography.customInput }}>
                            <PhoneInput
                                country={'cg'}
                                value={field.value}
                                onChange={field.onChange}
                                inputProps={{ required: true }}
                                countryCodeEditable={false}
                                containerStyle={{ marginTop: '8px' }}
                                inputStyle={{ width: '100%' }}
                            />
                            {errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text-phone-register">
                                    {errors.phone.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <Controller
                    name="adresse"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.address} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-address-register">Adresse</InputLabel>
                            <OutlinedInput {...field} id="outlined-adornment-address-register" />
                            {errors.address && (
                                <FormHelperText error id="standard-weight-helper-text-address-register">
                                    {errors.address.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <FormControl fullWidth error={!!errors.password} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-password-register">Mot de passe</InputLabel>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <OutlinedInput
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                id="outlined-adornment-password-register"
                                onChange={(e) => {
                                    field.onChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )}
                    />
                    {errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-register">
                            {errors.password.message}
                        </FormHelperText>
                    )}
                </FormControl>

                {strength !== 0 && (
                    <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                        {level?.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </FormControl>
                )}

                <Controller
                    name="password_confirmation"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.password_confirmation} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-password-confirm-register">Confirmer Mot de passe</InputLabel>
                            <OutlinedInput
                                {...field}
                                type={showPassword ? 'text' : 'password'}
                                id="outlined-adornment-password-confirm-register"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password_confirmation && (
                                <FormHelperText error id="standard-weight-helper-text-password-confirm-register">
                                    {errors.password_confirmation.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={(event) => setChecked(event.target.checked)}
                                    name="checked"
                                    color="primary"
                                />
                            }
                            label={
                                <Typography variant="subtitle1">
                                    Accepter &nbsp;
                                    <Typography variant="subtitle1" component={Link} to="#">
                                        Conditions générales.
                                    </Typography>
                                </Typography>
                            }
                        />
                    </Grid>
                </Grid>
                {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{errors.submit.message}</FormHelperText>
                    </Box>
                )}

                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            S&apos;inscrire
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default AuthRegister;
