'use client';



import { CoinPriceCalculator } from '@/components/CoinPriceCalculator';

import { useCartStore } from '@/store/cart.store';

import { CartItemWithPricing } from '@/components/interfaces/pricing.interface';

import InformationCoins from '@/components/home/InformationCoins';

import Reviews from '@/components/home/Reviews';

import { useState } from 'react';

import toast from 'react-hot-toast';



export const MonedasPage = () => {

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

					<CoinPriceCalculator

						pageTitle="Compra Monedas"

						pageSubtitle="Ajusta la cantidad en la barra y el precio se recalcula al instante"

						onAddToCart={handleAddToCart}

					/>

				</div>

			</div>



			<InformationCoins />

			<Reviews />

		</>

	);

};


