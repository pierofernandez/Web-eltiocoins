import { useState, useEffect } from 'react';

export const Banner = () => {
  const [timeLeft, setTimeLeft] = useState(86400);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative isolate flex flex-col items-center justify-center bg-gray-50 px-4 py-3 sm:flex-row sm:px-6 sm:py-2.5">
      <p className="text-xs sm:text-base text-gray-900 text-center sm:text-left">
        <strong className="font-semibold"></strong>
        20 % de descuento con el código ROCIOVALENTINA
      </p>
      <div className="flex items-center gap-1 sm:ml-2 text-red-700 text-xs sm:text-base">
        <p>Se expira en</p>
        <span className="countdown font-mono text-xs sm:text-xl text-black">
        <span style={{ "--value": hours } as React.CSSProperties} aria-live="polite">{hours}</span>h
            <span style={{ "--value": minutes } as React.CSSProperties} aria-live="polite">{minutes}</span>m
            <span style={{ "--value": seconds } as React.CSSProperties} aria-live="polite">{seconds}</span>s
        </span>
      </div>
    </div>
  );
};
