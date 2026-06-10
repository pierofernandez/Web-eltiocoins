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
import { FiArrowLeft, FiLock, FiShoppingBag, FiUser, FiCreditCard, FiAlertTriangle } from "react-icons/fi";

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
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Fondos decorativos de marca */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_-10%,rgba(0,255,135,0.10),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(0,255,135,0.06),transparent_40%)]" />

      {/* NAVBAR */}
      <nav className="relative z-20 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <FiArrowLeft size={18} />
            <span className="hidden sm:inline">Seguir comprando</span>
          </Link>

          <Link to="/" className="flex items-center gap-2">
            <img
              loading="lazy"
              src="/img/logotiocoins.webp"
              alt="Logo"
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <span className="flex items-center gap-2 text-xs font-semibold text-[#00FF87]">
            <FiLock size={15} />
            <span className="hidden sm:inline">Pago seguro</span>
          </span>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {totalItems === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[60vh] flex-col items-center justify-center text-center"
          >
            <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-zinc-600">
              <FiShoppingBag size={36} />
            </span>
            <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              ¡Tu carrito está vacío!
            </h2>
            <Link
              to="/monedas"
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-emerald-600 px-6 py-3 font-bold text-black shadow-xl transition hover:from-[#00e07a] hover:to-emerald-700 sm:px-8 sm:py-4"
            >
              <FaGamepad className="text-lg sm:text-xl" />
              <span>Explorar Productos</span>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* ENCABEZADO + PASOS */}
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
                Finalizar compra
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-2 rounded-full bg-[#00FF87]/10 px-3 py-1.5 font-semibold text-[#00FF87]">
                  <FiShoppingBag size={14} /> Carrito
                </span>
                <span className="h-px w-5 bg-zinc-700" />
                <span className="flex items-center gap-2 rounded-full bg-[#00FF87]/10 px-3 py-1.5 font-semibold text-[#00FF87]">
                  <FiUser size={14} /> Información
                </span>
                <span className="h-px w-5 bg-zinc-700" />
                <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 font-semibold text-zinc-400">
                  <FiCreditCard size={14} /> Pago
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
            >
              {/* FORM */}
              <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md sm:p-6 lg:p-8">
                {/* AVISO IMPORTANTE */}
                <div className="flex items-start gap-3 rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-3 sm:p-4">
                  <FiAlertTriangle className="mt-0.5 flex-shrink-0 text-yellow-300" size={18} />
                  <p className="text-sm font-medium text-yellow-200">
                    <strong>Importante:</strong> activa la opción de compras por internet /
                    compras en el extranjero en tu tarjeta o billetera antes de pagar.
                  </p>
                </div>

                {/* FORMULARIO */}
                <FormCheckout />
              </div>

              {/* SUMMARY */}
              <div className="h-fit rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md sm:p-6 lg:sticky lg:top-8 lg:p-8">
                <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00FF87]/15 text-[#00FF87]">
                    <FiShoppingBag size={18} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      Resumen del pedido
                    </h3>
                    <p className="text-sm text-gray-400">
                      {totalItems} producto{totalItems !== 1 ? "s" : ""} en tu carrito
                    </p>
                  </div>
                </div>

                <ItemsCheckout />
              </div>
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};
