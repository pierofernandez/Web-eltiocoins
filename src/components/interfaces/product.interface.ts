import { Json } from '../../supabase/supabase';
import { JSONContent } from '@tiptap/react';


export interface VariantProduct {
	id: string;
	stock: number;
	price: number;
}

export interface Product {
	id: string;
	name: string;
	category: string;
	platform: string;
	slug: string;
	features: string[];
	description: Json;
	images: string[];
	created_at: string;
	variants: VariantProduct[];
}

export interface PreparedProducts {
	id: string;
	name: string;
	platform: string;
	slug: string;
	features: string[];
	description: Json;
	images: string[];
	created_at: string;
	price: number;
	variants: VariantProduct[];
}

export interface ProductInput {
	name: string;
	category: string;
	platform: string;
	slug: string;
	features: string[];
	description: JSONContent;
	images: File[];
	variants: VariantInput[];
}

export interface VariantInput {
	id?: string;
	stock: number;
	price: number;
}
