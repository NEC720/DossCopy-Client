// assets
import {
    IconBuildingStore,
    IconCalendarStats,
    IconDeviceWatchStats,
    IconHomeStats,
    IconBrandChrome,
    IconHelp,
    IconPhoneCall,
    IconHistory,
    IconEaseInOutControlPoints
} from '@tabler/icons-react';
import StorageIcon from '@mui/icons-material/Storage';

// constant
const icons = {
    IconBuildingStore,
    IconCalendarStats,
    IconDeviceWatchStats,
    IconHomeStats,
    IconBrandChrome,
    IconHelp,
    IconPhoneCall,
    IconHistory,
    IconEaseInOutControlPoints
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const suivi = {
    id: 'suivis',
    type: 'group',
    title: 'Suivi',
    children: [
        {
            id: 'history',
            title: 'Historique',
            type: 'item',
            url: '/suivi/history',
            icon: icons.IconHistory
            // target: true
        },
        {
            id: 'userstats',
            title: 'Statistiques',
            type: 'item',
            url: '/suivi/userstats',
            icon: icons.IconCalendarStats
            // target: true
        },
        {
            id: 'userstorage',
            title: 'Stockage',
            type: 'item',
            url: '/suivi/stockage',
            icon: StorageIcon // icons.IconBuildingStore
            // target: true
        }
    ]
};

export default suivi;
