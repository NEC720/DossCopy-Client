// assets
import {
    IconCalendarStats,
    IconDeviceWatchStats,
    IconHomeStats,
    IconBrandChrome,
    IconHelp,
    IconPhoneCall,
    IconHistory,
    IconEaseInOutControlPoints
} from '@tabler/icons-react';

// constant
const icons = {
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

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        // Où était le menu suivi sans storage
        {
            id: 'support-tech',
            title: 'Contacter le Support', //Sample Page
            type: 'item',
            url: '/supportTech',
            icon: icons.IconPhoneCall,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Aide',
            type: 'item',
            url: '#', //https://codedthemes.gitbook.io/berry/
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default other;
