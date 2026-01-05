import { supabase } from "../supabase/client";

export interface Offer {
    id: string;
    image_url: string;
    link_url: string;
    is_active: boolean;
    created_at: string;
}

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

export const updateOffer = async (offer: { id?: string; image_file?: File; link_url: string; is_active: boolean }) => {
    try {
        let imageUrl = '';

        // If there is a new image file, upload it
        if (offer.image_file) {
            const path = `offers/offer-${Date.now()}-${offer.image_file.name}`;
            const { error } = await supabase.storage
                .from('product-images')
                .upload(path, offer.image_file);

            if (error) throw new Error(error.message);

            imageUrl = supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
        }

        if (offer.id) {
            // Update existing offer
            const updateData: any = {
                link_url: offer.link_url,
                is_active: offer.is_active,
            };

            if (imageUrl) updateData.image_url = imageUrl;

            const { data, error } = await (supabase
                .from('offers' as any) as any)
                .update(updateData)
                .eq('id', offer.id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data as Offer;
        } else {
            // Create new offer
            if (!imageUrl) throw new Error('Se requiere una imagen para crear una nueva oferta');

            const { data, error } = await (supabase
                .from('offers' as any) as any)
                .insert({
                    image_url: imageUrl,
                    link_url: offer.link_url,
                    is_active: offer.is_active,
                })
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data as Offer;
        }
    } catch (error) {
        console.error('Error updating offer:', error);
        throw error;
    }
};
