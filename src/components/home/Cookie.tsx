import { useState } from "react";

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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-start p-4">
            <section className="max-w-md p-4 bg-white border border-none dark:bg-gray-800 rounded-2xl shadow-lg">
                <h2 className="font-semibold text-gray-800 dark:text-white">🪙 We use cookies!</h2>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    This website uses essential cookies for proper operation. By accepting, you consent to our cookie policy.
                </p>
                <div className="flex justify-end gap-4 mt-4">
                    <button 
                        className="bg-gray-900 text-white font-medium rounded-lg px-4 py-2.5 hover:bg-gray-700 transition-colors"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button 
                        className="border text-gray-800 border-none dark:text-white dark:hover:bg-gray-700 font-medium rounded-lg px-4 py-2.5 hover:bg-gray-100 transition-colors"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </section>
        </div>
    );
};
