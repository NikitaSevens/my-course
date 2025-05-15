import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../mock/Products';
import styles from "./Home.module.css";

const Home = () => {
  return (
    <p>
      <div className={styles.container}>
        <ProductList products={mockProducts} />
      </div>
    </p>
  );
};

export default Home;