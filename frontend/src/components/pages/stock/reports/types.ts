import {
  CurrentStock as CurrentStockApiType,
  Movement as MovementApiType,
} from '../../../../api/Stock/types';

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

export interface Movement extends MovementApiType {
  id: number;
}

export interface CurrentStock extends CurrentStockApiType {}
