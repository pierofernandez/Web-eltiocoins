import { supabase } from "../supabase/client";

export interface Banner {
    id: string;
    desktop_url: string;
    mobile_url: string;
    display_order: number;
    created_at: string;
}

export const getBanners = async () => {
    const { data, error } = await (supabase
        .from('banners' as any) as any)
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching banners:', error.message);
        throw new Error(error.message);
    }

    return data as Banner[];
};

export const createBanner = async (banner: { desktop_file: File; mobile_file: File; display_order: number }) => {
    try {
        // 1. Upload desktop image
        const desktopPath = `banners/desktop-${Date.now()}-${banner.desktop_file.name}`;
        const { error: desktopError } = await supabase.storage
            .from('product-images') // Reusing existing bucket or create a new one 'banners' if it exists. 
            // Based on previous code, product-images is used.
            .upload(desktopPath, banner.desktop_file);

        if (desktopError) throw new Error(desktopError.message);

        const desktopUrl = supabase.storage.from('product-images').getPublicUrl(desktopPath).data.publicUrl;

        // 2. Upload mobile image
        const mobilePath = `banners/mobile-${Date.now()}-${banner.mobile_file.name}`;
        const { error: mobileError } = await supabase.storage
            .from('product-images')
            .upload(mobilePath, banner.mobile_file);

        if (mobileError) throw new Error(mobileError.message);

        const mobileUrl = supabase.storage.from('product-images').getPublicUrl(mobilePath).data.publicUrl;

        // 3. Insert into database
        const { data, error } = await (supabase
            .from('banners' as any) as any)
            .insert({
                desktop_url: desktopUrl,
                mobile_url: mobileUrl,
                display_order: banner.display_order
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        return data as Banner;
    } catch (error) {
        console.error('Error creating banner:', error);
        throw error;
    }
};

export const deleteBanner = async (banner: Banner) => {
    try {
        // 1. Delete files from storage
        const desktopPath = banner.desktop_url.split('/product-images/').pop();
        const mobilePath = banner.mobile_url.split('/product-images/').pop();

        if (desktopPath) {
            await supabase.storage.from('product-images').remove([desktopPath]);
        }
        if (mobilePath) {
            await supabase.storage.from('product-images').remove([mobilePath]);
        }

        // 2. Delete from database
        const { error } = await (supabase
            .from('banners' as any) as any)
            .delete()
            .eq('id', banner.id);

        if (error) throw new Error(error.message);

        return true;
    } catch (error) {
        console.error('Error deleting banner:', error);
        throw error;
    }
};
