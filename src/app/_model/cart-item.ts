import { Product } from './product';

export class CartItem {
  id: number;
  name: string;
  imageProfile: {
    urlImage: string;
  };
  price: number;
  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    // this.imageProfile.urlImage = product.imageProfile.imageName;
    this.price = product.price;
    this.quantity = 1;
  }
}
