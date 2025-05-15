import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../mock/Products';
import styles from "./Home.module.css";
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <ProductList products={mockProducts} />
      </div>
      <Footer />
    </>
  );
};

export default Home;