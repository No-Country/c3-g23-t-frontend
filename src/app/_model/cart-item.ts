import { Product } from './product';

export class CartItem {
  id: number;
  name: string;
  urlImage: string;
  price: number;
  amount: number;

  constructor(product: Product, img: string) {
    this.id = product.id;
    this.name = product.name;
    this.urlImage = img;
    this.price = product.price;
    this.amount = 1;
  }
}
