import { Link } from "react-router-dom";


export const NotFound = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-black tracking-widest">404</h1>
            <div className="bg-[#5BD054] px-2 text-sm rounded rotate-12 absolute">
                Proximamente
            </div>
            <button className="mt-5">
                <a
                    className="relative inline-block text-sm font-medium text-[#5BD054] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#5BD054] group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        <Link to="/">Go Home</Link>
                    </span>
                </a>
            </button>
        </main>
    );
};

