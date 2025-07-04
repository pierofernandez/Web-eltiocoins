import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, DivisionRivalsPage, FutChampionsPage, MonedasPage, MonedaPage, LoginPage, RegisterPage, OrdersUserPage, ThankyouPage, OrderUserPage, ComplaintsBook, PasoAPasoPage } from "../pages";
import { FutChampionPage } from "../pages/FutChampionPage";
import { DivisionRivalPage } from "../pages/DivisionRivalPage";
import { ClientLayout } from "../layouts/ClientLayout";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { Refundpolicy } from "../pages/Refundpolicy";
import { NotFound } from "../pages/NotFount";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { UpdatePasswordPage } from "../pages/UpdatePasswordPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'monedas',
                element: <MonedasPage />
            },
            {
                path: 'monedas/:slug',
                element: <MonedaPage />
            },
            {
                path: 'futchampions',
                element: <FutChampionsPage />
            },
            {
                path: 'futchampions/:slug',
                element: <FutChampionPage />
            },
            {
                path: 'divisionrivals',
                element: <DivisionRivalsPage />
            },
            {
                path: 'divisionrivals/:slug',
                element: <DivisionRivalPage />
            },
            {
                path: 'paso-a-paso',
                element: <PasoAPasoPage />
            },
            
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage/>
            },
            {
                path: 'update-password',
                element: <UpdatePasswordPage/>
            },
            {
                path: 'privacypolicy',
                element: <PrivacyPolicy />
            },
            {
                path: 'refundpolicy',
                element: <Refundpolicy />
            },
            {
                path: 'complaintsbook',
                element: <ComplaintsBook />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: 'account',
                element: <ClientLayout />,
                children: [
                    {
                        path: '',
                        element: <Navigate to= '/account/pedidos'/>
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage/>
                    },
                    {
                        path: 'pedidos/:id',
                        element: <OrderUserPage/>
                    }
                ]
            },

        ],
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        path: '/checkout/:id/thank-you',
        element: <ThankyouPage />
    },
    
]);