import { useState, useEffect } from "react";

export const Banner = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Fecha objetivo: 10 días desde ahora
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      setTimeLeft(difference > 0 ? difference : 0);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-r from-[#1d0036] via-[#400060] to-[#0d0024] border-y-4 border-[#ff00e0]">
      {/* Fondo neon geométrico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,224,0.12),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,204,255,0.12),transparent_60%)]"></div>

      {/* Contenedor principal */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center px-3 py-3 gap-3">
        {/* Primera línea (oferta + cupón en desktop, oferta + timer en mobile) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Badge Oferta */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#ff00e0] to-[#00d4ff] px-3 py-1 rounded-full shadow-lg shadow-[#ff00e080] flex-shrink-0">
            <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
              Oferta Especial
            </span>
            <span className="bg-white text-[#1d0036] px-2 py-0.5 rounded-full font-extrabold text-xs sm:text-sm">
              20% OFF
            </span>
          </div>

          {/* Cupón solo visible en sm+ */}
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
            <span className="text-white font-medium text-xs sm:text-base">Código:</span>
            <span className="text-[#00d4ff] font-extrabold tracking-wide text-sm sm:text-lg">
              COR22
            </span>
          </div>

          {/* Timer inline solo en mobile */}
          <div className="flex sm:hidden items-center gap-2 bg-[#1d0036]/70 px-3 py-1 rounded-lg border border-[#00d4ff]/40">
            <span className="text-white/70 text-xs">Expira:</span>
            <span className="text-[#ff00e0] font-bold">{days}D</span>
            <span className="text-[#00d4ff] font-bold">{hours.toString().padStart(2, "0")}H</span>
            <span className="text-[#ff9c00] font-bold">{minutes.toString().padStart(2, "0")}M</span>
            <span className="text-white font-bold animate-pulse">{seconds.toString().padStart(2, "0")}S</span>
          </div>
        </div>

        {/* Timer completo (debajo en mobile, inline en sm+) */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0 bg-[#1d0036]/70 px-3 py-2 rounded-lg border border-[#00d4ff]/40 shadow-md">
          <span className="text-white/70 text-xs sm:text-sm">Expira en:</span>

          {/* Days */}
          <div className="flex items-baseline gap-1">
            <span className="text-[#ff00e0] font-mono font-extrabold text-lg sm:text-2xl drop-shadow-md">
              {days}
            </span>
            <span className="text-white/60 text-xs">D</span>
          </div>
          <span className="text-[#00d4ff] font-bold">:</span>

          {/* Hours */}
          <div className="flex items-baseline gap-1">
            <span className="text-[#00d4ff] font-mono font-extrabold text-lg sm:text-2xl drop-shadow-md">
              {hours.toString().padStart(2, "0")}
            </span>
            <span className="text-white/60 text-xs">H</span>
          </div>
          <span className="text-[#00d4ff] font-bold">:</span>

          {/* Minutes */}
          <div className="flex items-baseline gap-1">
            <span className="text-[#ff9c00] font-mono font-extrabold text-lg sm:text-2xl drop-shadow-md">
              {minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-white/60 text-xs">M</span>
          </div>
          <span className="text-[#00d4ff] font-bold">:</span>

          {/* Seconds */}
          <div className="flex items-baseline gap-1 animate-pulse">
            <span className="text-white font-mono font-extrabold text-lg sm:text-2xl drop-shadow-md">
              {seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-white/60 text-xs">S</span>
          </div>
        </div>
      </div>

      {/* Glow inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff00e0] via-[#00d4ff] to-[#ff9c00] blur-sm"></div>
    </div>
  );
};
