import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

export const navbarLinks = [
    {
        id: 1,
        title: 'inicio',
        href: '/',
    },
    {
        id: 2,
        title: 'Monedas',
        href: '/monedas',
    },
    {
        id: 3,
        title: 'FutChampions',
        href: '/futchampions',
    },
    {
        id: 4,
        title: 'DivisiónRivals',
        href: '/divisionrivals',
    },
    
];

export const socialLinks = [
	{
		id: 1,
		title: 'Facebook',
		href: 'https://www.facebook.com',
		icon: <FaFacebookF />,
	},
	{
		id: 2,
		title: 'Twitter',
		href: 'https://www.twitter.com',
		icon: <FaXTwitter />,
	},
	{
		id: 3,
		title: 'Instagram',
		href: 'https://www.instagram.com',
		icon: <FaInstagram />,
	},
	{
		id: 4,
		title: 'Tiktok',
		href: 'https://www.tiktok.com',
		icon: <FaTiktok />,
	},
];