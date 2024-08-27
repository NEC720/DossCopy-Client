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
    {
      id: 'suivi',
      title: 'Suivi',
      type: 'collapse',
      icon: icons.IconHomeStats,
      children: [
        {
          id: 'history',
          title: 'Historique',
          type: 'item',
          url: '/sample-page',
          icon: icons.IconHistory
          // target: true
        },
        {
          id: 'userstats',
          title: 'Statistiques',
          type: 'item',
          url: '/sample-page',
          icon: icons.IconCalendarStats
          // target: true
        }
      ]
    },
    {
      id: 'sample-page',
      title: 'Contacter le Support', //Sample Page
      type: 'item',
      url: '/sample-page',
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
