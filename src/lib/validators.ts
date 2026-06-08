import { z } from 'zod';
import { JSONContent } from '@tiptap/react';


export const userRegisterSchema = z.object({
	email: z.string().email('El correo electrónico no es válido'),
	password: z
		.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
	fullName: z.string().min(1, 'El nombre completo es requerido'),
	phone: z.string().optional(),
});

export const addressSchema = z.object({
	city: z
		.string()
		.min(1, 'La ciudad es requerida')
		.max(50, 'La ciudad no debe exceder los 50 carácteres'),
	state: z
		.string()
		.min(1, 'El estado es requerido')
		.max(50, 'El estado no debe exceder los 50 carácteres'),
	postalcode: z
		.string()
		.max(10, 'El código postal no debe exceder los 10 carácteres')
		.optional(),
	country: z.string().min(1, 'El país es requerido'),
});

export type UserRegisterFormValues = z.infer<
	typeof userRegisterSchema
>;
export type AddressFormValues = z.infer<typeof addressSchema>;

export const autoPurchaseSchema = z.object({
	clientName: z
		.string()
		.min(3, 'El nombre del cliente es requerido')
		.max(80, 'El nombre no debe exceder los 80 caracteres'),
	eaEmail: z.string().email('El email EA no es válido'),
	eaPassword: z
		.string()
		.min(8, 'La contraseña EA debe tener al menos 8 caracteres'),
	backupCode1: z.string().min(1, 'El backup code principal es requerido'),
	backupCode2: z.string().optional(),
	backupCode3: z.string().optional(),
});

export type AutoPurchaseFormValues = z.infer<typeof autoPurchaseSchema>;

const isContentEmpty = (value: JSONContent): boolean => {
	if (
		!value ||
		!Array.isArray(value.content) ||
		value.content.length == 0
	) {
		return true;
	}

	return !value.content.some(
		node =>
			node.type === 'paragraph' &&
			node.content &&
			Array.isArray(node.content) &&
			node.content.some(
				textNode =>
					textNode.type === 'text' &&
					textNode.text &&
					textNode.text.trim() !== ''
			)
	);
};

export const productSchema = z.object({
	name: z.string().min(1, 'El nombre del producto es requerido'),
	platform: z.string().min(1, 'La plataforma es requerida'),
	slug: z.string().min(1, 'El slug es requerido').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug debe contener solo letras minúsculas, números y guiones'),
	features: z.array(
		z.object({
			value: z
				.string()
				.min(1, 'El valor de la característica es requerido'),
		})
	),
	description: z.custom<JSONContent>(
		value => !isContentEmpty(value),
		{ message: 'La descripción no puede estar vacía' }
	),
	category: z.string().min(1, 'La categoría es requerida'),
	variants: z
		.array(
			z.object({
				id: z.string().optional(),
				stock: z.number(),
				price: z.number().min(0.01, 'El precio debe ser mayor a 0'),
			})
		)
		.min(1, 'Debe haber al menos una variante'),
	images: z.array(z.any()).min(1, 'Debe haber al menos una imagen'),
});

export type ProductFormValues = z.infer<typeof productSchema>;