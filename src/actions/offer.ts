import { supabase } from "../supabase/client";
import { compressImageFile } from "../helpers/compressImage";

export interface Offer {
    id: string;
    image_url: string;
    mobile_image_url: string | null;
    link_url: string;
    is_active: boolean;
    created_at: string;
}

const uploadOfferImage = async (file: File, prefix: 'desktop' | 'mobile') => {
    const optimized = await compressImageFile(file, 'offer');
    const path = `offers/${prefix}-${Date.now()}-${optimized.name}`;
    const { error } = await supabase.storage
        .from('product-images')
        .upload(path, optimized);

    if (error) throw new Error(error.message);

    return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
};

export const getOffers = async () => {
    const { data, error } = await (supabase
        .from('offers' as any) as any)
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching offers:', error.message);
        throw new Error(error.message);
    }

    return data as Offer[];
};

export const getActiveOffer = async () => {
    const { data, error } = await (supabase
        .from('offers' as any) as any)
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

    if (error) {
        console.error('Error fetching active offer:', error.message);
        return null;
    }

    return data as Offer | null;
};

export const updateOffer = async (offer: {
    id?: string;
    desktop_file?: File;
    mobile_file?: File;
    link_url: string;
    is_active: boolean;
}) => {
    try {
        let desktopUrl = '';
        let mobileUrl = '';

        if (offer.desktop_file) {
            desktopUrl = await uploadOfferImage(offer.desktop_file, 'desktop');
        }

        if (offer.mobile_file) {
            mobileUrl = await uploadOfferImage(offer.mobile_file, 'mobile');
        }

        if (offer.id) {
            const updateData: Record<string, string | boolean> = {
                link_url: offer.link_url,
                is_active: offer.is_active,
            };

            if (desktopUrl) updateData.image_url = desktopUrl;
            if (mobileUrl) updateData.mobile_image_url = mobileUrl;

            const { data, error } = await (supabase
                .from('offers' as any) as any)
                .update(updateData)
                .eq('id', offer.id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data as Offer;
        }

        if (!desktopUrl || !mobileUrl) {
            throw new Error('Se requieren imágenes desktop y mobile para crear una nueva oferta');
        }

        const { data, error } = await (supabase
            .from('offers' as any) as any)
            .insert({
                image_url: desktopUrl,
                mobile_image_url: mobileUrl,
                link_url: offer.link_url,
                is_active: offer.is_active,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data as Offer;
    } catch (error) {
        console.error('Error updating offer:', error);
        throw error;
    }
};
