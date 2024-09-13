import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import VerificationNotice from 'views/pages/verifications/VerificationNotice';
import VerifyEmail from 'views/pages/verifications/VerifyEmail';
import OAuthCallback from 'views/pages/providers/OAuthCallback';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/inscription/verification-email',
            element: <VerificationNotice />
        },
        {
            path: '/inscription/email-verified',
            element: <VerifyEmail />
        },
        {
            path: '/auth/callback',
            element: <OAuthCallback />
        }
    ]
};

export default AuthenticationRoutes;
