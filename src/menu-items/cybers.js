// assets
import {
    IconBrandGoogleMaps,
    IconStar,
    IconDeviceWatchStats,
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
} from '@tabler/icons-react';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandGoogleMaps,
    IconStar,
    IconDeviceWatchStats,
};

// ==============================|| CYBERS MENU ITEMS ||============================== //

const utilities = {
    id: 'cybers',
    title: 'Cybers',
    type: 'group',
    children: [
        {
            id: 'lieux-details',
            title: 'lieux & details',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.IconBrandGoogleMaps, //IconMap2
            breadcrumbs: false
        },
        {
            id: 'favoris',
            title: 'Favoris',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconStar,
            breadcrumbs: false
        },
        {
            id: 'stats',
            title: 'Stats',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconDeviceWatchStats,
            breadcrumbs: false
        }
    ]
};

export default utilities;
