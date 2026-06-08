export interface AutoDeliveryInput {
	clientName: string;
	eaEmail: string;
	eaPassword: string;
	backupCode1: string;
	backupCode2?: string;
	backupCode3?: string;
}

export interface OrderInput {
	address?: {
		city: string;
		state: string;
		postalCode?: string;
		country: string;
	};
	autoDelivery?: AutoDeliveryInput;
	cartItems: {
		variantId: string;
		quantity: number;
		price: number;
	}[];
	totalAmount: number;
}


export interface OrderItemSingle {
	created_at: string;
	id: number;
	status: string;
	total_amount: number;
};

export interface CoinAutoDelivery {
	client_name: string;
	ea_email: string;
	ea_password: string;
	backup_code_1: string;
	backup_code_2: string | null;
	backup_code_3: string | null;
}

export interface OrderWithCustomer {
	id: number;
	status: string;
	total_amount: number;
	created_at: string;
	customers: {
		full_name: string;
		email: string;
	} | null;
	coin_auto_delivery?: CoinAutoDelivery | CoinAutoDelivery[] | null;
}

export interface OrderAdminDetail {
	customer: {
		email: string;
		full_name: string;
	};
	totalAmount: number;
	status: string;
	create_at: string;
	address: {
		city?: string;
		state?: string;
		postalCode?: string;
		country?: string;
	};
	orderItems: {
		quantity: number;
		price: number;
		productName?: string;
		productImage?: string;
		productCategory?: string;
	}[];
	autoDelivery: {
		clientName: string;
		eaEmail: string;
		eaPassword: string;
		backupCode1: string;
		backupCode2?: string | null;
		backupCode3?: string | null;
	} | null;
	isCoinAutoSale: boolean;
}