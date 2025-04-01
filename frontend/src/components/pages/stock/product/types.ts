export interface Product {
  name: string;
  description: string;
  brand_id: number;
  category_id: number;
}

export interface ProductId extends Product {
  id: number;
}

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
}

export enum MovementSourceTypeIn {
  BUY = 'BUY',
  DONATION = 'DONATION',
}

export enum MovementSourceTypeOut {
  USE = 'USE',
  EXPIRED = 'EXPIRED',
}

export enum MovementSource {
  BUY = 'COMPRA',
  DONATION = 'DOAÇÃO',
  USE = 'USO',
  EXPIRED = 'DESCARTE',
}

export interface ProductMovement {
  product_id: number;
  movement_type: MovementType;
  movement_source: MovementSourceTypeIn | MovementSourceTypeOut;
  quantity: number;
  created_by: string;
  observations?: string;
}
