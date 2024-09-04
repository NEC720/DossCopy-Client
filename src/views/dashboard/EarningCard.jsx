import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import PrintIcon from '@mui/icons-material/Print';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF
import DescriptionIcon from '@mui/icons-material/Description'; // Word
import GridOnIcon from '@mui/icons-material/GridOn'; // Excel
import ImageIcon from '@mui/icons-material/Image'; // PNG

const EarningCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard
                    border={false}
                    content={false}
                    sx={{
                        bgcolor: 'secondary.dark',
                        color: '#fff',
                        overflow: 'hidden',
                        position: 'relative',
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.secondary[800],
                            borderRadius: '50%',
                            top: { xs: -105, sm: -85 },
                            right: { xs: -140, sm: -95 }
                        },
                        '&:before': {
                            content: '""',
                            position: 'absolute',
                            width: 210,
                            height: 210,
                            background: theme.palette.secondary[800],
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
                                                bgcolor: 'secondary.800',
                                                mt: 1
                                            }}
                                        >
                                            <PrintIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                bgcolor: 'secondary.dark',
                                                color: 'secondary.200',
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                        <Menu
                                            id="menu-earning-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Importer
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copier
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Exporter
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archiver
                                            </MenuItem>
                                        </Menu>
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
                                    Fichiers récemment imprimés
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </MainCard>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
