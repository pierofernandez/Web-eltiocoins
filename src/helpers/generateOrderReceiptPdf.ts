import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export type OrderReceiptData = {
	orderId: number;
	customerName: string;
	customerEmail: string;
	createdAt: string;
	status: string;
	paymentMethod: string;
	total: string;
	items: {
		name: string;
		quantity: number;
		price: string;
		subtotal: string;
	}[];
	address?: {
		city?: string;
		state?: string;
		postalCode?: string;
		country?: string;
	} | null;
};

export const generateOrderReceiptPdf = (data: OrderReceiptData) => {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	let y = 18;

	doc.setFillColor(14, 15, 17);
	doc.rect(0, 0, pageWidth, 42, 'F');

	doc.setTextColor(0, 255, 135);
	doc.setFontSize(22);
	doc.setFont('helvetica', 'bold');
	doc.text('EL TIO COINS', pageWidth / 2, 16, { align: 'center' });

	doc.setTextColor(220, 220, 220);
	doc.setFontSize(11);
	doc.setFont('helvetica', 'normal');
	doc.text('Recibo de compra', pageWidth / 2, 26, { align: 'center' });

	doc.setTextColor(30, 30, 30);
	y = 52;

	doc.setFontSize(12);
	doc.setFont('helvetica', 'bold');
	doc.text(`Pedido #${data.orderId}`, 14, y);
	y += 8;

	doc.setFontSize(10);
	doc.setFont('helvetica', 'normal');
	const infoLines = [
		`Cliente: ${data.customerName}`,
		`Email: ${data.customerEmail}`,
		`Fecha: ${data.createdAt}`,
		`Método de pago: ${data.paymentMethod}`,
		`Estado: ${data.status}`,
	];

	infoLines.forEach((line) => {
		doc.text(line, 14, y);
		y += 6;
	});

	y += 4;

	autoTable(doc, {
		startY: y,
		head: [['Producto', 'Cant.', 'Precio unit.', 'Subtotal']],
		body: data.items.map((item) => [
			item.name,
			String(item.quantity),
			item.price,
			item.subtotal,
		]),
		styles: { fontSize: 9, cellPadding: 3 },
		headStyles: { fillColor: [0, 180, 100], textColor: 255 },
		alternateRowStyles: { fillColor: [245, 245, 245] },
	});

	const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 20;
	y = finalY + 10;

	doc.setFont('helvetica', 'bold');
	doc.setFontSize(12);
	doc.text('Total:', pageWidth - 60, y);
	doc.text(data.total, pageWidth - 14, y, { align: 'right' });

	if (data.address?.city || data.address?.country) {
		y += 14;
		doc.setFontSize(10);
		doc.setFont('helvetica', 'bold');
		doc.text('Dirección:', 14, y);
		y += 6;
		doc.setFont('helvetica', 'normal');
		if (data.address.city || data.address.state) {
			doc.text(`${data.address.city ?? ''}, ${data.address.state ?? ''}`.trim(), 14, y);
			y += 6;
		}
		if (data.address.postalCode) {
			doc.text(data.address.postalCode, 14, y);
			y += 6;
		}
		if (data.address.country) {
			doc.text(data.address.country, 14, y);
		}
	}

	const footerY = doc.internal.pageSize.getHeight() - 16;
	doc.setFontSize(8);
	doc.setTextColor(120, 120, 120);
	doc.text(
		'Gracias por tu compra en El Tio Coins · eltiocoins@gmail.com',
		pageWidth / 2,
		footerY,
		{ align: 'center' }
	);

	doc.save(`recibo-pedido-${data.orderId}.pdf`);
};
