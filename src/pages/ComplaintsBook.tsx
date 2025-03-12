import { useState } from "react";

export const ComplaintsBook = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if (!isChecked) {
            setError("Debes aceptar las Políticas y privacidad antes de enviar.");
            return;
        }
        setError(""); // Limpia el error si todo está correcto
        alert("Formulario enviado correctamente"); // Aquí iría la lógica para enviar el formulario
    };

    return (
        <div className="flex justify-center items-center min-h-full">
            <form className="w-full max-w-screen-xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-center mb-7 text-black font-extrabold text-3xl">Libro de Reclamaciones</h1>

                <h1 className="text-left mb-7 text-black font-medium">1. Datos del Cliente</h1>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Nombre Completo
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="ejm: Jhon Braulio Sanchez Inga*" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            E-mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ejm: Jhon12@hotmail.com*" />
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Documento de Identidad
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="ejm: 0434834721*" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Telefono
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="ejm: 940475937*" />
                    </div>
                </div>

                <h1 className="text-left mb-7 text-black font-medium">2. Reclamación y pedido del cliente</h1>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Reclamo / Queja
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="ejm: Reclamo / Queja*" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Asunto
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ejm: No me llegó las monedas*" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Detalles del problema
                        </label>
                        <textarea className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>

                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <p className="text-gray-600 text-xs italic mr-2">He leído las Políticas y privacidad</p>
                    <input 
                        type="checkbox" 
                        className="w-4 h-4" 
                        checked={isChecked} 
                        onChange={(e) => setIsChecked(e.target.checked)} 
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic text-center mt-2">{error}</p>}

                <div className="md:flex md:items-center mt-4">
                    <div className="md:w-1/3">
                        <button 
                            className="shadow bg-teal-400 hover:bg-teal-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                            type="button" 
                            onClick={handleSubmit}
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="md:w-2/3"></div>
                </div>
            </form>
        </div>
    );
};

export default ComplaintsBook;
