import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
// import ImpressionPage from 'views/Imprimer/ImpressionPage';
import PrintRequest from 'views/Imprimer/PrintRequest';
import { UserProfile } from 'views/profileSection/UserProfile';
import UserProfileView from 'views/profileSection/UserProfileView';
// import ContactSupport from 'views/supportTech/ContactSupport';
// import StatsPage from 'views/suivis/stats/StatsPage';
// import StoragePage from 'views/suivis/storage/StoragePage';
// import FileExplorer from 'views/suivis/storage/FileExplorer';
// import ActivityHistory from 'views/suivis/history/ActivityHistory';
// import FavoriteCybers from 'views/cybers/favorites/FavoriteCybers';
// import CyberList from 'views/cybers/places/components/CyberList';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const CyberInfos = Loadable(lazy(() => import('views/cybers/places/CyberInfos')));
const CyberList = Loadable(lazy(() => import('views/cybers/places/components/CyberList')));
const FavoriteCybers = Loadable(lazy(() => import('views/cybers/favorites/FavoriteCybers')));
const ActivityHistory = Loadable(lazy(() => import('views/suivis/history/ActivityHistory')));
// const FileExplorer = Loadable(lazy(() => import('views/suivis/storage/FileExplorer')));
const StoragePage = Loadable(lazy(() => import('views/suivis/storage/StoragePage')));
const StatsPage = Loadable(lazy(() => import('views/suivis/stats/StatsPage')));
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const ContactSupport = Loadable(lazy(() => import('views/supportTech/ContactSupport')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'print',
                    element: <PrintRequest />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <CyberList />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <FavoriteCybers />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        // {
        //   path: 'icons',
        //   children: [
        //     {
        //       path: 'tabler-icons',
        //       element: <UtilsTablerIcons />
        //     }
        //   ]
        // },
        // {
        //   path: 'icons',
        //   children: [
        //     {
        //       path: 'material-icons',
        //       element: <UtilsMaterialIcons />
        //     }
        //   ]
        // },

        {
            path: 'suivi',
            children: [
                {
                    path: 'history',
                    element: <ActivityHistory />
                }
            ]
        },
        {
            path: 'suivi',
            children: [
                {
                    path: 'userstats',
                    element: <StatsPage />
                }
            ]
        },
        {
            path: 'suivi',
            children: [
                {
                    path: 'stockage',
                    element: <StoragePage />
                }
            ]
        },

        {
            path: 'supportTech',
            element: <ContactSupport />
        },

        {
            path: 'sample-page',
            element: <SamplePage />
        },

        {
            path: 'apps/profiles/user/personal',
            element: <UserProfile />
        },
        {
            path: '/apps/profiles/account/basic',
            element: <UserProfileView />
        },
        {
            path: '/cybers/cyberInfos',
            element: <CyberInfos />
        }
    ]
};

export default MainRoutes;
