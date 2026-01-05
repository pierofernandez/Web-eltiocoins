import { useState, useEffect } from 'react';
import { getBanners, createBanner, deleteBanner, Banner } from '../../../actions/banner';
import { getOffers, updateOffer, Offer } from '../../../actions/offer';
import { IoIosAddCircleOutline, IoIosTrash, IoIosSave } from 'react-icons/io';

export const BannerManager = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);

    // New banner state
    const [newBanner, setNewBanner] = useState<{ desktop: File | null; mobile: File | null; order: number }>({
        desktop: null,
        mobile: null,
        order: 0
    });

    // Current offer state (the first one is usually the active one)
    const [currentOffer, setCurrentOffer] = useState<{ id?: string; image_file: File | null; link_url: string; is_active: boolean }>({
        image_file: null,
        link_url: '/monedas',
        is_active: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [bannersData, offersData] = await Promise.all([getBanners(), getOffers()]);
            setBanners(bannersData);
            setOffers(offersData);

            if (offersData.length > 0) {
                setCurrentOffer({
                    id: offersData[0].id,
                    image_file: null,
                    link_url: offersData[0].link_url,
                    is_active: offersData[0].is_active
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBanner = async () => {
        if (!newBanner.desktop || !newBanner.mobile) {
            alert('Por favor selecciona ambas imágenes (Desktop y Mobile)');
            return;
        }

        try {
            setLoading(true);
            await createBanner({
                desktop_file: newBanner.desktop,
                mobile_file: newBanner.mobile,
                display_order: newBanner.order
            });
            setNewBanner({ desktop: null, mobile: null, order: 0 });
            await fetchData();
        } catch (error) {
            alert('Error al crear el banner');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBanner = async (banner: Banner) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este banner?')) return;

        try {
            setLoading(true);
            await deleteBanner(banner);
            await fetchData();
        } catch (error) {
            alert('Error al eliminar el banner');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOffer = async () => {
        if (!currentOffer.id && !currentOffer.image_file) {
            alert('Por favor selecciona una imagen para la nueva oferta');
            return;
        }

        try {
            setLoading(true);
            await updateOffer({
                id: currentOffer.id,
                image_file: currentOffer.image_file || undefined,
                link_url: currentOffer.link_url,
                is_active: currentOffer.is_active
            });
            alert('Oferta actualizada correctamente');
            await fetchData();
        } catch (error) {
            alert('Error al actualizar la oferta');
        } finally {
            setLoading(false);
        }
    };

    if (loading && banners.length === 0) return <div className="p-10 text-white">Cargando...</div>;

    return (
        <div className="space-y-10 p-5 text-white bg-stone-900 min-h-screen">
            <h1 className="text-3xl font-bold border-b border-stone-700 pb-2">Gestión de Banners y Ofertas</h1>

            {/* BANNER SECTION */}
            <section className="bg-stone-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    Banners del Inicio
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {banners.map((banner) => (
                        <div key={banner.id} className="bg-stone-700 rounded-md overflow-hidden relative group">
                            <img src={banner.desktop_url} alt="Banner" className="w-full h-32 object-cover" />
                            <div className="p-3 flex justify-between items-center">
                                <span className="text-sm text-stone-300">Orden: {banner.display_order}</span>
                                <button
                                    onClick={() => handleDeleteBanner(banner)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <IoIosTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-stone-700/50 p-6 rounded-md border border-stone-600">
                    <h3 className="text-lg font-medium mb-4">Añadir Nuevo Banner</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-stone-400 mb-1">Imagen Desktop</label>
                            <input
                                type="file"
                                onChange={(e) => setNewBanner({ ...newBanner, desktop: e.target.files?.[0] || null })}
                                className="w-full text-sm bg-stone-800 border border-stone-600 rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-stone-400 mb-1">Imagen Mobile</label>
                            <input
                                type="file"
                                onChange={(e) => setNewBanner({ ...newBanner, mobile: e.target.files?.[0] || null })}
                                className="w-full text-sm bg-stone-800 border border-stone-600 rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-stone-400 mb-1">Orden de visualización</label>
                            <input
                                type="number"
                                value={newBanner.order}
                                onChange={(e) => setNewBanner({ ...newBanner, order: parseInt(e.target.value) })}
                                className="w-full bg-stone-800 border border-stone-600 rounded p-2"
                            />
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleCreateBanner}
                        className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-stone-600 px-6 py-2 rounded-md flex items-center gap-2 transition-all"
                    >
                        <IoIosAddCircleOutline size={22} />
                        {loading ? 'Subiendo...' : 'Subir Banner'}
                    </button>
                </div>
            </section>

            {/* OFFER SECTION */}
            <section className="bg-stone-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    Imagen de Oferta (Pop-up)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        {offers[0] && (
                            <div className="border border-stone-700 rounded-md overflow-hidden bg-stone-900/50 p-2">
                                <p className="text-xs text-stone-500 mb-1 text-center font-mono">Vista Previa Actual</p>
                                <img src={offers[0].image_url} alt="Offer pop up" className="max-h-64 mx-auto object-contain rounded" />
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="offer-active"
                                checked={currentOffer.is_active}
                                onChange={(e) => setCurrentOffer({ ...currentOffer, is_active: e.target.checked })}
                                className="w-5 h-5 accent-cyan-600"
                            />
                            <label htmlFor="offer-active" className="text-stone-300 font-medium cursor-pointer">
                                Pop-up Activo
                            </label>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm text-stone-400 mb-1">Nueva Imagen (opcional si ya existe)</label>
                            <input
                                type="file"
                                onChange={(e) => setCurrentOffer({ ...currentOffer, image_file: e.target.files?.[0] || null })}
                                className="w-full text-sm bg-stone-800 border border-stone-600 rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-stone-400 mb-1">URL de redirección (Ej: /monedas)</label>
                            <input
                                type="text"
                                value={currentOffer.link_url}
                                onChange={(e) => setCurrentOffer({ ...currentOffer, link_url: e.target.value })}
                                className="w-full bg-stone-800 border border-stone-600 rounded p-2"
                            />
                        </div>

                        <button
                            disabled={loading}
                            onClick={handleUpdateOffer}
                            className="bg-green-600 hover:bg-green-500 disabled:bg-stone-600 px-6 py-2 rounded-md flex items-center gap-2 transition-all w-full justify-center"
                        >
                            <IoIosSave size={22} />
                            {loading ? 'Guardando...' : 'Guardar Cambios de Oferta'}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
