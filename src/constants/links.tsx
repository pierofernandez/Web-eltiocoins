import { FaInstagram, FaTiktok, FaWhatsapp, FaBoxOpen, FaCartShopping, FaImage } from "react-icons/fa6";

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
        title: 'Boosting División Rivals',
        href: '/divisionrivals',
    },
    {
        id: 5,
        title: '¿Cómo Comprar?',
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
]