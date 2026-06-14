import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ClientLayout } from "../layouts/ClientLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { ProtectedRoute } from "../components/shared/ProtectedRoute";
import { Loader } from "../components/shared/Loader";

// Páginas con carga diferida (code-splitting automático por ruta)
const HomePage = lazy(() => import("../pages/HomePage").then(m => ({ default: m.HomePage })));
const MonedasPage = lazy(() => import("../pages/MonedasPage").then(m => ({ default: m.MonedasPage })));
const MonedaPage = lazy(() => import("../pages/MonedaPage").then(m => ({ default: m.MonedaPage })));
const FutChampionsPage = lazy(() => import("../pages/FutChampionsPage").then(m => ({ default: m.FutChampionsPage })));
const FutChampionPage = lazy(() => import("../pages/FutChampionPage").then(m => ({ default: m.FutChampionPage })));
const DivisionRivalsPage = lazy(() => import("../pages/DivisionRivalsPage").then(m => ({ default: m.DivisionRivalsPage })));
const DivisionRivalPage = lazy(() => import("../pages/DivisionRivalPage").then(m => ({ default: m.DivisionRivalPage })));
const ObjetivosPage = lazy(() => import("../pages/ObjetivosPage").then(m => ({ default: m.ObjetivosPage })));
const ObjetivoPage = lazy(() => import("../pages/ObjetivoPage").then(m => ({ default: m.ObjetivoPage })));
const PasoAPasoPage = lazy(() => import("../pages/PasoAPasoPage").then(m => ({ default: m.PasoAPasoPage })));
const JuegaYGanaPage = lazy(() => import("../pages/JuegaYGanaPage").then(m => ({ default: m.JuegaYGanaPage })));
const LoginPage = lazy(() => import("../pages/LoginPage").then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("../pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage })));
const UpdatePasswordPage = lazy(() => import("../pages/UpdatePasswordPage").then(m => ({ default: m.UpdatePasswordPage })));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const Refundpolicy = lazy(() => import("../pages/Refundpolicy").then(m => ({ default: m.Refundpolicy })));
const ComplaintsBook = lazy(() => import("../pages/ComplaintsBook").then(m => ({ default: m.ComplaintsBook })));
const NotFound = lazy(() => import("../pages/NotFount").then(m => ({ default: m.NotFound })));
const OrdersUserPage = lazy(() => import("../pages/OrdersUsersPage").then(m => ({ default: m.OrdersUserPage })));
const OrderUserPage = lazy(() => import("../pages/OrderUserPage").then(m => ({ default: m.OrderUserPage })));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage").then(m => ({ default: m.CheckoutPage })));
const ThankyouPage = lazy(() => import("../pages/ThankyouPage").then(m => ({ default: m.ThankyouPage })));
const CheckoutSuccessPage = lazy(() => import("../pages/CheckoutSuccessPage").then(m => ({ default: m.CheckoutSuccessPage })));
const CheckoutFailurePage = lazy(() => import("../pages/CheckoutFailurePage").then(m => ({ default: m.CheckoutFailurePage })));
const CheckoutPendingPage = lazy(() => import("../pages/CheckoutPendingPage").then(m => ({ default: m.CheckoutPendingPage })));

// Dashboard
const DashboardHomePage = lazy(() => import("../pages/dashboard/DashboardHomePage").then(m => ({ default: m.DashboardHomePage })));
const DashboardProductsPage = lazy(() => import("../pages/dashboard/DashboardProductsPage").then(m => ({ default: m.DashboardProductsPage })));
const DashboardNewProductPage = lazy(() => import("../pages/dashboard/DashboardNewProductPage").then(m => ({ default: m.DashboardNewProductPage })));
const DashboardProductSlugPage = lazy(() => import("../pages/dashboard/DashboardProductSlugPage").then(m => ({ default: m.DashboardProductSlugPage })));
const DashboardOrdersPage = lazy(() => import("../pages/dashboard/DashboardOrdersPage").then(m => ({ default: m.DashboardOrdersPage })));
const DashboardOrderPage = lazy(() => import("../pages/dashboard/DashboardOrderPage").then(m => ({ default: m.DashboardOrderPage })));
const DashboardBannersPage = lazy(() => import("../pages/dashboard/DashboardBannersPage").then(m => ({ default: m.DashboardBannersPage })));
const DashboardPricesPage = lazy(() => import("../pages/dashboard/DashboardPricesPage").then(m => ({ default: m.DashboardPricesPage })));

// Envuelve un elemento en Suspense para mostrar el Loader mientras carga el chunk
const el = (node: ReactNode): ReactNode => (
    <Suspense fallback={<Loader />}>{node}</Suspense>
);

export const router = createBrowserRouter([

    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: el(<HomePage />)
            },
            {
                path: 'monedas',
                element: el(<MonedasPage />)
            },
            {
                path: 'monedas/:slug',
                element: el(<MonedaPage />)
            },
            {
                path: 'futchampions',
                element: el(<FutChampionsPage />)
            },
            {
                path: 'futchampions/:slug',
                element: el(<FutChampionPage />)
            },
            {
                path: 'divisionrivals',
                element: el(<DivisionRivalsPage />)
            },
            {
                path: 'divisionrivals/:slug',
                element: el(<DivisionRivalPage />)
            },
            {
                path: 'objetivos',
                element: el(<ObjetivosPage />)
            },
            {
                path: 'objetivos/:slug',
                element: el(<ObjetivoPage />)
            },
            {
                path: 'paso-a-paso',
                element: el(<PasoAPasoPage />)
            },
            {
                path: 'juega-y-gana',
                element: <ProtectedRoute>{el(<JuegaYGanaPage />)}</ProtectedRoute>
            },

            {
                path: 'login',
                element: el(<LoginPage />)
            },
            {
                path: 'register',
                element: el(<RegisterPage />)
            },
            {
                path: 'forgot-password',
                element: el(<ForgotPasswordPage />)
            },
            {
                path: 'update-password',
                element: el(<UpdatePasswordPage />)
            },
            {
                path: 'privacypolicy',
                element: el(<PrivacyPolicy />)
            },
            {
                path: 'refundpolicy',
                element: el(<Refundpolicy />)
            },
            {
                path: 'complaintsbook',
                element: el(<ComplaintsBook />)
            },
            {
                path: '*',
                element: el(<NotFound />)
            },
            {
                path: 'account',
                element: <ClientLayout />,
                children: [
                    {
                        path: '',
                        element: <Navigate to='/account/pedidos' />
                    },
                    {
                        path: 'pedidos',
                        element: el(<OrdersUserPage />)
                    },
                    {
                        path: 'pedidos/:id',
                        element: el(<OrderUserPage />)
                    }
                ]
            },

        ],
    },
    {
        path: '/checkout',
        element: el(<CheckoutPage />),
    },
    {
        path: '/checkout/:id/thank-you',
        element: el(<ThankyouPage />)
    },
    {
        path: '/checkout/success',
        element: el(<CheckoutSuccessPage />)
    },
    {
        path: '/checkout/failure',
        element: el(<CheckoutFailurePage />)
    },
    {
        path: '/checkout/pending',
        element: el(<CheckoutPendingPage />)
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: el(<DashboardHomePage />)
            },
            {
                path: 'productos',
                element: el(<DashboardProductsPage />)
            },
            {
                path: 'productos/new',
                element: el(<DashboardNewProductPage />)
            },
            {
                path: 'productos/editar/:id',
                element: el(<DashboardProductSlugPage />)
            },
            {
                path: 'ordenes',
                element: el(<DashboardOrdersPage />)
            },
            {
                path: 'ordenes/:id',
                element: el(<DashboardOrderPage />)
            },
            {
                path: 'banners',
                element: el(<DashboardBannersPage />)
            },
            {
                path: 'precios',
                element: el(<DashboardPricesPage />)
            }
        ]
    }

]);
