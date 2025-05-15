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
              <div className={styles.left}>
                <img src={item.img} alt={item.title} className={styles.image} />
                  <div className={styles.controls}>
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
              </div>

              <div className={styles.info}>
                <h3>{item.title}</h3>
                <p>{item.price.toLocaleString('ru-RU')} ₽</p>
              </div>

              <div className={styles.right}>
                <button onClick={() => removeFromCart(item.id)} className={styles.delete}>
                <img src="./src/assets/icons/trashcan.svg" alt="" />
                </button>
                <p>{item.price.toLocaleString('ru-RU') }  ₽</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className={styles.summary}>
            <div s>
              <h3>ИТОГО</h3>
              <p>{totalPrice} ₽</p>
            </div>
          </div>
            <button className={styles.checkout}>Перейти к оформлению</button>
        </div>
        </div>
    </div>
  );
};

export default CartPage;
