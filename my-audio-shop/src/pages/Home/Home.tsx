import ProductList from '../../components/ProductList/ProductList';
import { mockProducts } from '../../mock/Products';
import styles from "./Home.module.css";
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <div id="headerTrigger"></div>
      <div  className={styles.container}>
        <ProductList products={mockProducts} />
      <Footer />
      </div>
    </>
  );
};

export default Home;