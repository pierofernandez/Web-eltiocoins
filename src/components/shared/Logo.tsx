import { Link } from "react-router-dom";

export const Logo = () => {
    return(
        <Link
            to='/'
            className={'text-2x1 font-bold tracking-tighter transition-all '}
        >
            <img
                src="/img/logotiocoins.webp"
                alt="logotiocoins"
                width={40}
                height={40}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className='max-w-10'
            />
        </Link>
    );
};