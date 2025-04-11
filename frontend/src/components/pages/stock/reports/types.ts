import { CurrentStock as CurrentStockApiType } from '../../../../api/Stock/types';
import { ProductMovement } from '../movement/types';

export interface ButtonContent {
  key: string;
  type: string;
  content: React.ReactNode;
}

export enum MovementSource {
  BUY = 'COMPRA',
  DONATION = 'DOAÇÃO',
  USE = 'USO',
  EXPIRED = 'DESCARTE',
}

export enum MovementType {
  IN = 'ENTRADA',
  OUT = 'SAÍDA',
}

export interface Movement extends ProductMovement {
  id: number;
}

export interface CurrentStock extends CurrentStockApiType {}
