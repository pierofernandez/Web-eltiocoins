import { useEffect, useState } from "react";

export const Cookie = () => {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const yaMostrado = sessionStorage.getItem("ofertaMostrada");

    if (!yaMostrado) {
      setMostrar(true);
      sessionStorage.setItem("ofertaMostrada", "true");
    }
  }, []);

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <a href="/monedas" rel="noopener noreferrer">
          <img
            src="/img/oferta.webp"
            alt="Oferta"
            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg cursor-pointer"
          />
        </a>
        <button
          onClick={() => setMostrar(false)}
          className="absolute top-2 right-2 text-white rounded-full px-3 py-1 text-sm shadow"
        >
          ✕
        </button>
      </div>
    </div>
  );

};

