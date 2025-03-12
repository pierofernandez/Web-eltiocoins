import { useState } from "react";
import { supabase } from "../../supabase/client";

export const Newsletter = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [message, setMessage] = useState("");

	const handleSubscribe = async () => {
		if (!phoneNumber || isNaN(Number(phoneNumber))) {
			setMessage("Por favor, ingresa un número de teléfono válido.");
			return;
		}

		// Insertando el número de teléfono en la tabla "promotions"
		const { error } = await supabase
			.from("promotions")
			.insert([{ prom_couching: Number(phoneNumber) }]); // Convertimos a número

		if (error) {
			console.error("Error al suscribirse:", error.message);
			setMessage("Error al suscribirse. Inténtalo de nuevo.");
		} else {
			setMessage("¡Te has suscrito exitosamente!");
			setPhoneNumber(""); // Limpiar input después de enviar
		}
	};

	return (
		<div className="2xl:mx-auto 2xl:container mx-4 py-16">
			<div className="w-full relative flex items-center justify-center">
				<img src="img/futbolfondo.png" alt="dining" className="w-full h-full absolute z-0 hidden xl:block" />

				<div className="bg-gray-800 bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
					<h1 className="text-4xl font-semibold leading-9 text-white text-center">¿No puedes Ganar?</h1>
					<p className="text-base leading-normal text-center text-white mt-6">
						Vuélvete un pro player con nuestro servicio de Coaching. Mejora tus habilidades, domina estrategias <br />
						avanzadas y alcanza un nivel competitivo con la guía de expertos. ¡Lleva tu juego al siguiente nivel!<br />
						Regístrate Aquí
					</p>
					<div className="sm:border border-white flex-col sm:flex-row flex items-center lg:w-5/12 w-full mt-12 space-y-4 sm:space-y-0">
						<input
							className="border border-white sm:border-transparent text-base w-full font-medium leading-none text-white p-4 focus:outline-none bg-transparent placeholder-white"
							placeholder="Ingresa tu número de teléfono"
							type="tel"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
						<button
							onClick={handleSubscribe}
							className="focus:outline-none focus:ring-offset-2 focus:ring border border-white sm:border-transparent w-full sm:w-auto bg-white py-4 px-6 hover:bg-opacity-75"
						>
							Suscribete
						</button>
					</div>
					{message && <p className="text-white mt-4">{message}</p>}
				</div>
			</div>
		</div>
	);
};
