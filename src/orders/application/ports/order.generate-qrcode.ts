export interface GenerateQrCodePayload {
  in_store_order_id: string;
  qr_data: string;
}
export abstract class GenerateQrCode {
  abstract generateQrCode(data: {
    orderId: string;
    totalAmount: number;
    items: {
      title: string;
      description: string;
      quantity: number;
      unitPrice: number;
      category: string;
      totalAmount: number;
    }[];
  }): Promise<GenerateQrCodePayload>;
}
