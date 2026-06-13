import { FaInstagram, FaTiktok, FaWhatsapp, FaBoxOpen, FaCartShopping, FaImage, FaChartLine } from "react-icons/fa6";

export const navbarLinks = [
    {
        id: 1,
        title: 'Inicio',
        href: '/',
    },
    {
        id: 2,
        title: 'Monedas',
        href: '/monedas',
    },
    {
        id: 3,
        title: 'Boosting Fut Champions',
        href: '/futchampions',
    },
    {
        id: 4,
        title: 'Boosting Objetivos',
        href: '/objetivos',
    },
    {
        id: 5,
        title: 'División Rivals',
        href: '/divisionrivals',
    },
    {
        id: 6,
        title: 'Conseguir Códigos',
        href: '/paso-a-paso',
    },

];

export const socialLinks = [

    {
        id: 1,
        title: 'Instagram',
        href: 'https://www.instagram.com/eltiocoins/',
        icon: <FaInstagram />,
    },
    {
        id: 2,
        title: 'WhatsApp',
        href: 'https://goo.su/R4SXY7',
        icon: <FaWhatsapp />,
    },
    {
        id: 3,
        title: 'Tiktok',
        href: 'https://www.tiktok.com/@eltiocoins',
        icon: <FaTiktok />,
    },
];

export const dashboardLinks = [
    {
        id: 0,
        title: 'Inicio',
        href: '/dashboard',
        icon: <FaChartLine size={25} />,
        end: true,
    },
    {
        id: 1,
        title: 'Productos',
        href: '/dashboard/productos',
        icon: <FaBoxOpen size={25} />,
    },
    {
        id: 2,
        title: 'Ordenes',
        href: '/dashboard/ordenes',
        icon: <FaCartShopping size={25} />,
    },
    {
        id: 3,
        title: 'Banners/Ofertas',
        href: '/dashboard/banners',
        icon: <FaImage size={25} />,
    },
    {
        id: 4,
        title: 'Precios',
        href: '/dashboard/precios',
        icon: <FaImage size={25} />,
    },
]