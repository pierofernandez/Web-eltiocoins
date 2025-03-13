import { useState } from "react";
import { Link } from "react-router-dom";

export const Cookie = () => {
    const [showModal, setShowModal] = useState(true);

    const handleAccept = () => {
        console.log("Cookies aceptadas");
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4 lg:items-start lg:justify-center">
            <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl lg:w-3/4 mx-auto lg:mt-10">
                <p className="text-sm text-gray-700 text-center">
                    Utilizamos cookies para garantizar que obtenga la mejor experiencia en nuestro sitio web.
                    <Link to='/privacypolicy' className='text-red-700 text-sm ml-1'>Leer más</Link>
                </p>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                    <button
                        className="px-4 py-2 bg-[#DDAF13] text-white rounded hover:bg-[#DDAF13] transition duration-300 ease-in-out w-full sm:w-auto"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300 ease-in-out w-full sm:w-auto"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
