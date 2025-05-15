import { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
  img_star: './assets/icons/star.svg'
}