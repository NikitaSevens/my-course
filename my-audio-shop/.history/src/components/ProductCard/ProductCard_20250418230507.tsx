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
      <img src={product.img} alt={product.title} />
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <span className={styles.rating}>
          <img src={product.image} alt="star" /> {product.rating}{" "}
        </span>
      </div>
      <div className={styles.priceRow}>
        <span>
          {product.price} {product.currency}
        </span>
        {product.old_price && (
          <span className={styles.old}>
            {product.old_price} {product.currency}
          </span>
        )}

        <button onClick={() => addToCart(product)} className={styles.buyButton}>
          Купить
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
