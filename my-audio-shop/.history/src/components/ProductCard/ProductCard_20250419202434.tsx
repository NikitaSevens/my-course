import { Product } from "../../types/product";
import styles from "./ProductCard.module.css";
import { useCart } from "../../context/CartContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      <img src={product.img} alt={product.title} className={styles.productImage} />
      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{product.title}</h3>
          <span className={styles.rating}>
            <img src={product.image} alt="star" /> {product.rating}{" "}
          </span>
        </div>
        <div className={`${styles.priceRow} ${product.old_price ? styles.priceRowCompact : ''}`}
        >
          <div className={styles.price__old}>
            <span>
              {product.price.toLocaleString('ru-RU')} {product.currency}
            </span>
            {product.old_price && (
              <span className={styles.old}>
                {product.old_price.toLocaleString('ru-RU')} {product.currency}
              </span>
            )}
          </div>
          <button onClick={() => addToCart(product)} className={styles.buyButton}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
