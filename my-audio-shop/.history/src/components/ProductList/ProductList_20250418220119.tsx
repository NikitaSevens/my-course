import { Product } from '../../types/product';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;