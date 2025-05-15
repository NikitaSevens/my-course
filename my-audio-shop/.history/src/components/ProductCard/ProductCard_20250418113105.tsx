import styles from './ProductCard.module.css';
import { FC } from 'react';
import { Button } from '../Button';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
  onBuy: (id: number) => void;
}

export const ProductCard: FC<Props> = ({ product, onBuy }) => {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price} ₽</p>
      <Button onClick={() => onBuy(product.id)}>Купить</Button>
    </div>
  );
};