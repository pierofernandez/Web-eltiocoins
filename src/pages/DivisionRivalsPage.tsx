'use client';



import { BoostPriceCalculator } from '@/components/BoostPriceCalculator';

import { useCartStore } from '@/store/cart.store';

import { CartItemWithPricing } from '@/components/interfaces/pricing.interface';

import InformationBoostingRivals from '@/components/home/InformationBoostingRivals';

import Reviews from '@/components/home/Reviews';

import { useState } from 'react';

import toast from 'react-hot-toast';



export const DivisionRivalsPage = () => {

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

						category="divisionrivals"

						pageTitle="Division Rivals Boosting"

						pageSubtitle="Selecciona tu división destino — precio dinámico desde el panel admin"

						onAddToCart={handleAddToCart}

					/>

				</div>

			</div>



			<InformationBoostingRivals />

			<Reviews />

		</>

	);

};


