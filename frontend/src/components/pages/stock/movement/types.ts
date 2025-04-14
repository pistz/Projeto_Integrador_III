import { ProductMovement as ProductMovementApiType } from '../../../../api/Stock/types';

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

export interface ProductMovement extends ProductMovementApiType {}
