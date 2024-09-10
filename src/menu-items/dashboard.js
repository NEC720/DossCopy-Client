// assets
import { IconDashboard, IconPrinter } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconPrinter };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Accueil',
    type: 'group',
    children: [
        {
            id: 'default',
            title: "Vue d'ensemble",
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        // Add more dashboard items here...
        {
            id: 'print',
            title: 'Imprimer',
            type: 'item',
            url: '/dashboard/print',
            icon: icons.IconPrinter,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
