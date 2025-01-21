import { Link } from "react-router-dom";

export const Logo = () => {
    return(
        <Link
            to='/'
            className={'text-2x1 font-bold tracking-tighter transition-all '}
        >
            <img src="/public/img/logotiocoins.png" alt="logotiocoins" className='max-w-10' />
        </Link>
    );
};