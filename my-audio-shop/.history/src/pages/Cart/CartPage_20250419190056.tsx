import styles from './CartPage.module.css';
import { useCart } from '../../context/CartContext';


const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Корзина</h2>

      <div className={styles.content}>
        <div className={styles.products}>
          {cart.map(item => (
            <div className={styles.card} key={item.id}>
              <img src={item.img} alt={item.title} className={styles.image} />

              <div className={styles.info}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.price} ₽</p>
                </div>

                <div className={styles.controls}>
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>

              <div className={styles.right}>
                <button onClick={() => removeFromCart(item.id)} className={styles.delete}>
                🗑️
                </button>
                <p>{item.price * item.quantity} ₽</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h3>ИТОГО</h3>
          <p>{totalPrice} ₽</p>
          <button className={styles.checkout}>Перейти к оформлению</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
