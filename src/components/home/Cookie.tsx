import { useEffect, useState } from "react";

type OfferPopup = {
  image_url: string;
  mobile_image_url?: string | null;
  link_url: string;
};

export const Cookie = () => {
  const [mostrar, setMostrar] = useState(false);
  const [offer, setOffer] = useState<OfferPopup | null>(null);

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
        setOffer({
          image_url: "/img/oferta.webp",
          mobile_image_url: "/img/oferta.webp",
          link_url: "/monedas",
        });
      }

      setMostrar(true);
      sessionStorage.setItem("ofertaMostrada", "true");
    } catch (error) {
      console.error("Error fetching offer:", error);
    }
  };

  if (!mostrar || !offer) return null;

  const mobileSrc = offer.mobile_image_url || offer.image_url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Contenedor ajustado al tamaño real de la imagen */}
      <div className="relative inline-block w-fit max-w-full">
        <a href={offer.link_url} rel="noopener noreferrer" className="block leading-none">
          <img
            loading="lazy"
            src={mobileSrc}
            alt="Oferta"
            className="h-auto max-h-[81vh] max-w-[81vw] cursor-pointer rounded-lg shadow-2xl md:hidden"
          />
          <img
            loading="lazy"
            src={offer.image_url}
            alt="Oferta"
            className="hidden h-auto max-h-[82.8vh] w-auto max-w-[min(82.8vw,810px)] cursor-pointer rounded-lg shadow-2xl md:block"
          />
        </a>

        <button
          type="button"
          onClick={() => setMostrar(false)}
          aria-label="Cerrar oferta"
          className="absolute right-0 top-0 z-10 flex h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-black/85 text-base font-bold text-white shadow-lg ring-2 ring-white/25 transition hover:bg-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
