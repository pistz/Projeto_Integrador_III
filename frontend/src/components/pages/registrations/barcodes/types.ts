import {
  Barcode as BarcodeAPIType,
  CreateBarcode as CreateBarcodeAPI,
} from '../../../../api/Barcodes/types';

export interface CreateBarcode extends CreateBarcodeAPI {}
export interface UpdateBarcode extends CreateBarcodeAPI {}
export interface Barcode extends BarcodeAPIType {}
