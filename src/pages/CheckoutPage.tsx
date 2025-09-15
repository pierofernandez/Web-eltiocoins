import { Link, useNavigate } from "react-router-dom";
import { FormCheckout } from "../components/checkout/FormCheckout";
import { useCartStore } from "../store/cart.store";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks";
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared";
import { motion } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

export const CheckoutPage = () => {
  const totalItems = useCartStore((state) => state.totalItemsInCart);
  const { isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-[#101010] relative overflow-hidden">
      {/* HEADER OVERLAY */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-[url('/checkout-bg.svg')] bg-cover opacity-5" />

      {/* NAVBAR */}
      <nav className="relative z-20 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/logotiocoins.webp"
              alt="Logo"
              className="h-8 w-auto sm:h-10"
            />
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {totalItems === 0 ? (
          <motion.div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                ¡Tu carrito está vacío!
              </h2>
              <Link
                to="/monedas"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-lime-400 to-green-600 text-black font-bold rounded-xl shadow-xl hover:from-lime-500 hover:to-green-700 transition"
              >
                <FaGamepad className="text-lg sm:text-xl" />
                <span>Explorar Productos</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* FORM */}
            <motion.div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-lime-400/30 space-y-4">
              {/* AVISO IMPORTANTE */}
              <div className="bg-yellow-400/10 border border-yellow-400/40 rounded-lg p-3 sm:p-4">
                <p className="text-yellow-300 font-semibold text-sm sm:text-base text-center">
                  ⚠️ Importante: Activa la opción de compras por internet / compras en el extranjero 
                  en tu tarjeta o billetera antes de realizar el pago.
                </p>
              </div>

              {/* FORMULARIO */}
              <FormCheckout />
            </motion.div>

            {/* SUMMARY */}
            <motion.div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-lime-400/30 lg:sticky lg:top-8 h-fit">
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                  Resumen del Pedido
                </h3>
                <p className="text-gray-400 text-sm">
                  {totalItems} producto{totalItems !== 1 ? "s" : ""} en tu
                  carrito
                </p>
              </div>

              <ItemsCheckout />
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};
