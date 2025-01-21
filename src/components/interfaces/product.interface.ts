import { JSONContent } from '@tiptap/react';

export interface Product {
	id: string;
	name: string;
	brand: string;
	slug: string;
	features: string[];
	description: JSONContent;
	images: string[];
	created_at: string;
	price: number;
	stock: number;
}

export interface PreparedProducts {
	id: string;
	name: string;
	brand: string;
	slug: string;
	features: string[];
	description: JSONContent;
	images: string[];
	created_at: string;
	price: number;
	stock: number;
}