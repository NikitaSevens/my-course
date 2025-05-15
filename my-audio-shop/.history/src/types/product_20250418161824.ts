export type Product = {
  id: number;
  img: string;           // путь к иконке товара
  title: string;         // название товара
  price: number;         // цена со скидкой
  old_price?: number;     // старая цена
  currency: string;      // валюта (₽, $, € и т.д.)
  rating: number;        // рейтинг от 0 до 5
  image: string;         // основное изображение товара
};

export interface CartItem extends Product {
  quantity: number;
  img_star: './'
}