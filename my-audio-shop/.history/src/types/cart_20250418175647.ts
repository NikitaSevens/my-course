import { Product } from './roduct';

export interface CartItem extends Product {
  quantity: number;
  img_star: string;
}