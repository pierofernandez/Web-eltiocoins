import { useState } from 'react';
import { formatPrice } from '../../helpers';
import { useCartStore } from '../../store/cart.store';
import { useDiscountStore } from '../../store/discount.store';
import { motion } from 'framer-motion';
import { FaGamepad, FaCoins, FaShieldAlt, FaTag } from 'react-icons/fa';

export const ItemsCheckout = () => {
	const cartItems = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);

	// Estado local para el código de descuento
	const [discountCode, setDiscountCode] = useState('');
	const [error, setError] = useState('');
	const { discount, setDiscount } = useDiscountStore();

	// Validación de código de descuento
	const handleApplyDiscount = () => {
		if (discountCode.trim().toUpperCase() === 'TIO10') {
			const discountAmount = totalAmount * 0.1; // 10% de descuento
			setDiscount(discountAmount);
			setError('');
		} else {
			setDiscount(0);
			setError('Código inválido o expirado');
		}
	};

	const finalTotal = totalAmount - discount;

	return (
		<div className="space-y-6">
			{/* Lista de productos */}
			<div className="space-y-4">
				{cartItems.map((item, index) => (
					<motion.div
						key={item.variantId}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
					>
						<div className="flex items-center gap-4">
							{/* Imagen del producto */}
							<div className="relative">
								<div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-white/10">
									<img
										src={item.image}
										alt={item.name}
										className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
									/>
								</div>
								{/* Badge de cantidad */}
								<div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-2 border-white">
									<span className="text-white text-xs font-bold">
										{item.quantity}
									</span>
								</div>
							</div>

							{/* Información del producto */}
							<div className="flex-1 min-w-0">
								<h4 className="text-white font-semibold text-sm lg:text-base truncate">
									{item.name}
								</h4>
								<div className="flex items-center gap-2 mt-1">
									<FaCoins className="text-yellow-400 text-xs" />
									<span className="text-yellow-400 font-bold text-sm">
										{formatPrice(item.price)}
									</span>
								</div>
							</div>

							{/* Precio total del item */}
							<div className="text-right">
								<p className="text-white font-bold text-sm lg:text-base">
									{formatPrice(item.price * item.quantity)}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* Separador */}
			<div className="border-t border-white/20 my-6"></div>

			{/* Apartado para código de descuento */}
			<div className="bg-black/20 rounded-xl p-4 border border-white/10">
				<div className="flex items-center gap-2">
					<FaTag className="text-green-400" />
					<input
						type="text"
						value={discountCode}
						onChange={(e) => setDiscountCode(e.target.value)}
						placeholder="Código de descuento"
						className="flex-1 bg-transparent border-b border-white/20 focus:border-green-400 outline-none text-white placeholder-gray-400 p-2"
					/>
					<button
						onClick={handleApplyDiscount}
						className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
					>
						Aplicar
					</button>
				</div>
				{error && <p className="text-red-400 text-sm mt-2">{error}</p>}
				{discount > 0 && (
					<p className="text-green-400 text-sm mt-2">
						¡Descuento aplicado! -{formatPrice(discount)}
					</p>
				)}
			</div>

			{/* Resumen de totales */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-400/20"
			>
				<div className="space-y-4">
					{/* Subtotal */}
					<div className="flex justify-between items-center">
						<span className="text-gray-300 text-sm">Subtotal:</span>
						<span className="text-white font-semibold">{formatPrice(totalAmount)}</span>
					</div>

					{/* Descuento */}
					{discount > 0 && (
						<div className="flex justify-between items-center">
							<span className="text-gray-300 text-sm">Descuento:</span>
							<span className="text-green-400 font-semibold">-{formatPrice(discount)}</span>
						</div>
					)}

					{/* Envío */}
					<div className="flex justify-between items-center">
						<span className="text-gray-300 text-sm">Envío:</span>
						<span className="text-green-400 font-semibold">GRATIS</span>
					</div>

					{/* Separador */}
					<div className="border-t border-white/20"></div>

					{/* Total */}
					<div className="flex justify-between items-center">
						<span className="text-white font-bold text-lg">Total:</span>
						<span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
							{formatPrice(finalTotal)}
						</span>
					</div>
				</div>
			</motion.div>

			{/* Info adicional */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="bg-black/20 rounded-xl p-4 border border-white/10"
			>
				<div className="flex items-start gap-3">
					<FaShieldAlt className="text-green-400 mt-1 flex-shrink-0" />
					<div className="text-sm">
						<p className="text-white font-semibold mb-1">Compra 100% Segura</p>
						<p className="text-gray-400">
							Tus datos están protegidos con encriptación SSL de nivel bancario
						</p>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="bg-black/20 rounded-xl p-4 border border-white/10"
			>
				<div className="flex items-start gap-3">
					<FaGamepad className="text-blue-400 mt-1 flex-shrink-0" />
					<div className="text-sm">
						<p className="text-white font-semibold mb-1">Entrega Instantánea</p>
						<p className="text-gray-400">
							Recibe tus productos en segundos después de confirmar el pago
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
