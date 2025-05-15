import ProductList from '../components/ProductList/ProductList';
import { mockProducts } from '../mock/Products';

const Home = () => {
  return (
    <div>
      <h2>Каталог товаров</h2>
      <ProductList products={mockProducts} />
    </div>
  );
};

export default Home;