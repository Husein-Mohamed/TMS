import { lazy } from 'react';
import AuthenticatedRoute from '../components/Auth-routes';
import { Navigate } from 'react-router-dom';
const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const UsersTable = lazy(() => import('../pages/App/UserTable'));
const RegisterForm = lazy(() => import('../pages/Forms/RegistartionForm'));

const routes = [
    // dashboard
    {
        path: '/dashboard',
        element: (
            <AuthenticatedRoute>
                <Index />
            </AuthenticatedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/',
        element: <Navigate to="/dashboard" />, // Redirects to /dashboard
    },
    // user table
    {
        path: '/usersList',
        element: <UsersTable />,
        layout: 'default',
    },
    // auth
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/auth/register',
        element: <Register />,
        layout: 'blank',
    },
    // forms
    {
        path: '/registerForm',
        element: <RegisterForm />,
        layout: 'blank',
    },
];

export { routes };
