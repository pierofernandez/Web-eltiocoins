'use client';



import { BoostPriceCalculator } from '@/components/BoostPriceCalculator';

import { useCartStore } from '@/store/cart.store';

import { CartItemWithPricing } from '@/components/interfaces/pricing.interface';

import InformationBoostingFutchampions from '@/components/home/InformationBoostingFutchampions';

import Reviews from '@/components/home/Reviews';

import { useState } from 'react';

import toast from 'react-hot-toast';



export const FutChampionsPage = () => {

	const addItem = useCartStore(state => state.addItem);

	const [successMessage, setSuccessMessage] = useState('');



	const handleAddToCart = (item: CartItemWithPricing) => {

		addItem(item);

		setSuccessMessage(`✅ ${item.name} agregado al carrito`);

		toast.success('Producto añadido al carrito', { position: 'bottom-right' });

		setTimeout(() => setSuccessMessage(''), 3000);

	};



	return (

		<>

			<div className="py-4">

				{successMessage && (

					<div className="mx-auto mb-6 max-w-lg rounded-lg border border-green-700 bg-green-900/20 p-4 text-green-300">

						{successMessage}

					</div>

				)}



				<div className="flex justify-center">

					<BoostPriceCalculator

						category="futchampions"

						pageTitle="Fut Champions Boosting"

						pageSubtitle="Elige tu rango destino del 5 al 1 — el precio se actualiza automáticamente"

						onAddToCart={handleAddToCart}

					/>

				</div>

			</div>



			<InformationBoostingFutchampions />

			<Reviews />

		</>

	);

};


