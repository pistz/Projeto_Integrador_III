export interface CreateBarcode {
  barcode: string;
  product_id: number;
}

export interface Barcode extends CreateBarcode {
  id: number;
}

export interface UpdateBarcode extends CreateBarcode {}
