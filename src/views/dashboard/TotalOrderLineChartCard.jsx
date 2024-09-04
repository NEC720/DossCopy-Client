import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
// import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// import ChartDataMonth from './chart-data/total-order-month-line-chart';
// import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF
import DescriptionIcon from '@mui/icons-material/Description'; // Word
import GridOnIcon from '@mui/icons-material/GridOn'; // Excel
import ImageIcon from '@mui/icons-material/Image'; // PNG

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
    const theme = useTheme();

    const [timeValue, setTimeValue] = React.useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <MainCard
                    border={false}
                    content={false}
                    sx={{
                        bgcolor: 'primary.dark',
                        color: '#fff',
                        overflow: 'hidden',
                        position: 'relative',
                        '&>div': {
                            position: 'relative',
                            zIndex: 5
                        },
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.primary[800],
                            borderRadius: '50%',
                            top: { xs: -105, sm: -85 },
                            right: { xs: -140, sm: -95 }
                        },
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.primary[800],
                            borderRadius: '50%',
                            top: { xs: -155, sm: -125 },
                            right: { xs: -70, sm: -15 },
                            opacity: 0.5
                        }
                    }}
                >
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                bgcolor: 'primary.800',
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <LocalMallOutlinedIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, true)}
                                        >
                                            50 Files
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, false)}
                                        >
                                            75% utilisé
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <PictureAsPdfIcon style={{ color: '#ff0000' }} fontSize="medium" /> {/* Icône PDF en rouge */}
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>
                                            Document1.pdf
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <DescriptionIcon style={{ color: '#2196f3' }} fontSize="medium" /> {/* Icône Word en bleu */}
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>
                                            Document2.docx
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item>
                                        <GridOnIcon style={{ color: '#4caf50' }} fontSize="medium" /> {/* Icône Excel en vert */}
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>
                                            Document3.xlsx
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <ImageIcon style={{ color: '#ff9800' }} fontSize="medium" /> {/* Icône PNG en orange */}
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}>Image1.png</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mt: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'secondary.200'
                                    }}
                                >
                                    Fichier stockés recemments
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </MainCard>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
