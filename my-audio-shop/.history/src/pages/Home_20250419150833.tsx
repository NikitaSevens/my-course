import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../mock/Products';

const Home = () => {
  return (
    <div>
      <ProductList products={mockProducts} />
    </div>
  );
};

export default Home;