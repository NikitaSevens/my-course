import { Product } from '../../types/product';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product;
}

return (
  <div className={styles.card}>
    <img src={product.img} alt={product.title} className={styles.productImage} />

    <div className={styles.info}>
      <h3>{product.title}</h3>
      <div className={styles.rating}>
        <img src="/assets/icons/star.svg" alt="star" />
        <span>{product.rating}</span>
      </div>
    </div>

    <div className={styles.priceRow}>
      <span>{product.price} {product.currency}</span>
      {product.old_price && (
        <span className={styles.old}>{product.old_price} {product.currency}</span>
      )}
    </div>

    <button onClick={() => addToCart(product)} className={styles.buyButton}>
      Купить
    </button>
  </div>
);
};

export default ProductCard;