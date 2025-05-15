import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../mock/Products';
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div clas>
      <ProductList products={mockProducts} />
    </div>
  );
};

export default Home;