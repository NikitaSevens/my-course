import { Product } from '../../types/product';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const wiredProducts = products.filter((product) => !product.wireless);
  const wirelessProducts = products.filter((product) => product.wireless);

  return (
    <div>
      <div className={styles.list}>
      <h2 className={styles.categoryTitle}>Наушники</h2>
        {wiredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h2 className={styles.categoryTitle}>Беспроводные наушники</h2>
      <div className={styles.list}>
        {wirelessProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;