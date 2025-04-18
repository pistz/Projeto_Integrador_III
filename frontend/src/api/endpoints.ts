import { loadBaseURL } from '../config/loadEnv';

export const base = {
  host: loadBaseURL(),
};

export const loginRoute = {
  login: `${base.host}/login`,
  resetPassword: `${base.host}/login/reset-password`,
};

export const userRoute = {
  create: `${base.host}/users`,
  getAll: `${base.host}/users/all`,
  delete: `${base.host}/users/`,
};

export const brandRoute = {
  create: `${base.host}/brands`,
  getAll: `${base.host}/brands/all`,
  delete: `${base.host}/brands`,
  update: `${base.host}/brands`,
};

export const categoryRoute = {
  create: `${base.host}/categories`,
  getAll: `${base.host}/categories/all`,
  delete: `${base.host}/categories`,
  update: `${base.host}/categories`,
};

export const productRoute = {
  create: `${base.host}/products`,
  getAll: `${base.host}/products/all`,
  delete: `${base.host}/products`,
  update: `${base.host}/products`,
  getByBarcode: `${base.host}/products?barcode`,
};

export const stockMovementsRoute = {
  move: `${base.host}/stock-movements`,
  getAll: `${base.host}/stock-movements/all`,
  getSingleById: `${base.host}/stock-movements`,
  getByDate: `${base.host}/stock-movements/date?`,
  getByDateRange: `${base.host}/stock-movements/date-range?`,
};

export const currentStockRoute = {
  getCurrentStockByProductId: `${base.host}/current-stock`,
  getCurrentStock: `${base.host}/current-stock/all`,
};

export const barcodeRoute = {
  create: `${base.host}/barcodes`,
  delete: `${base.host}/barcodes`,
  update: `${base.host}/barcodes`,
  getBarcodeByProductId: (id: number) => `${base.host}/products/${id}/barcodes`,
};
