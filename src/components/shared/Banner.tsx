import { useState, useEffect } from 'react';

export const Banner = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Fecha objetivo: 30 de junio de 2025 a las 23:59:59
    const targetDate = new Date('2025-06-30T23:59:59');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft(difference);
      } else {
        setTimeLeft(0);
      }
    };

    // Calcular tiempo inicial
    calculateTimeLeft();
    
    // Actualizar cada segundo
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-r from-purple-900 via-pink-900 to-red-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:20px_20px] xs:bg-[size:25px_25px] sm:bg-[size:30px_30px] lg:bg-[size:50px_50px] animate-pulse"></div>
      
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-2.5 lg:flex-row">
        {/* Discount Badge - Primera fila en móviles */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 mb-1.5 xs:mb-2 lg:mb-0">
          <div className="inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
            <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-[10px] xs:text-xs font-bold tracking-wider uppercase">Oferta Especial</span>
          </div>
          
          <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2">
            <span className="text-white text-[10px] xs:text-xs sm:text-sm lg:text-base font-medium">
              20% de descuento
            </span>
            <span className="text-yellow-300 text-[10px] xs:text-xs sm:text-sm lg:text-base font-bold">
              ROCIOVALENTINA
            </span>
          </div>
        </div>

        {/* Countdown Timer - Segunda fila en móviles */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 text-white text-xs sm:text-sm">
            <span className="font-medium">Expira en:</span>
          </div>
          
          <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2">
            {/* Days - Visible en todos los dispositivos */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-sm xs:rounded-md sm:rounded-lg px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-1 min-w-[28px] xs:min-w-[32px] sm:min-w-[40px] text-center">
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-white font-mono text-[10px] xs:text-xs sm:text-sm lg:text-lg font-bold">{days}</span>
                <span className="text-white/70 text-[8px] xs:text-xs">D</span>
              </div>
            </div>
            
            <span className="text-white/50 text-xs xs:text-sm sm:text-lg">:</span>
            
            {/* Hours */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-sm xs:rounded-md sm:rounded-lg px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-1 min-w-[28px] xs:min-w-[32px] sm:min-w-[40px] text-center">
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-white font-mono text-[10px] xs:text-xs sm:text-sm lg:text-lg font-bold">{hours.toString().padStart(2, '0')}</span>
                <span className="text-white/70 text-[8px] xs:text-xs">H</span>
              </div>
            </div>
            
            <span className="text-white/50 text-xs xs:text-sm sm:text-lg">:</span>
            
            {/* Minutes */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-sm xs:rounded-md sm:rounded-lg px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-1 min-w-[28px] xs:min-w-[32px] sm:min-w-[40px] text-center">
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-white font-mono text-[10px] xs:text-xs sm:text-sm lg:text-lg font-bold">{minutes.toString().padStart(2, '0')}</span>
                <span className="text-white/70 text-[8px] xs:text-xs">M</span>
              </div>
            </div>
            
            <span className="text-white/50 text-xs xs:text-sm sm:text-lg">:</span>
            
            {/* Seconds */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-sm xs:rounded-md sm:rounded-lg px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-1 min-w-[28px] xs:min-w-[32px] sm:min-w-[40px] text-center animate-pulse">
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-white font-mono text-[10px] xs:text-xs sm:text-sm lg:text-lg font-bold">{seconds.toString().padStart(2, '0')}</span>
                <span className="text-white/70 text-[8px] xs:text-xs">S</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 xs:h-0.5 sm:h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>
    </div>
  );
};
