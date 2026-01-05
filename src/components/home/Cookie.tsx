import { useEffect, useState } from "react";

export const Cookie = () => {
  const [mostrar, setMostrar] = useState(false);
  const [offer, setOffer] = useState<{ image_url: string; link_url: string } | null>(null);

  useEffect(() => {
    const yaMostrado = sessionStorage.getItem("ofertaMostrada");

    if (!yaMostrado) {
      fetchOffer();
    }
  }, []);

  const fetchOffer = async () => {
    try {
      const { getActiveOffer } = await import("../../actions/offer");
      const activeOffer = await getActiveOffer();

      if (activeOffer) {
        setOffer(activeOffer);
      } else {
        // Fallback
        setOffer({
          image_url: "/img/oferta.webp",
          link_url: "/monedas"
        });
      }

      setMostrar(true);
      sessionStorage.setItem("ofertaMostrada", "true");
    } catch (error) {
      console.error("Error fetching offer:", error);
    }
  };

  if (!mostrar || !offer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <a href={offer.link_url} rel="noopener noreferrer">
          <img
            src={offer.image_url}
            alt="Oferta"
            className="max-w-[90vw] max-h-[90vh] md:max-w-[500px] md:max-h-[80vh] h-auto rounded shadow-lg cursor-pointer"
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

