export type Product = {
  id: number;
  img: string;           // путь к иконке товара
  title: string;         // название товара
  price: number;         // цена со скидкой
  old_price?: number;   
  currency: string;     
  rating: number;       
  image: string;         
};

