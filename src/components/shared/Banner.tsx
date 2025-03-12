import { useState, useEffect } from 'react';

export const Banner = () => {
  // Estado para almacenar el tiempo restante en segundos
  const [timeLeft, setTimeLeft] = useState(86400); // 86400 segundos = 24 horas

  useEffect(() => {
    // Si el tiempo restante llega a cero, detener el contador
    if (timeLeft <= 0) return;

    // Crear un intervalo que actualice el tiempo cada segundo
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte o el tiempo llegue a cero
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Calcular horas, minutos y segundos a partir del tiempo restante
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative isolate flex items-center justify-center bg-gray-50 px-4 py-3 sm:px-6 sm:py-2.5">
      {/* Fondo decorativo (izquierda) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* Fondo decorativo (derecha) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
        <p className="text-[10px] sm:text-xs leading-6 text-gray-900">
          <strong className="font-semibold"></strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-1 inline size-0.5 fill-current"
          >
          </svg>
          20 % de descuento con el código ROCIOVALENTINA
        </p>

        <p className="text-red-700 text-[10px] sm:text-xs">Se expira en </p>

        <span className="countdown font-mono text-sm sm:text-base">
          <span style={{ "--value": hours } as React.CSSProperties} aria-live="polite">{hours}</span>h
          <span style={{ "--value": minutes } as React.CSSProperties} aria-live="polite">{minutes}</span>m
          <span style={{ "--value": seconds } as React.CSSProperties} aria-live="polite">{seconds}</span>s
        </span>
      </div>
    </div>
  );
};