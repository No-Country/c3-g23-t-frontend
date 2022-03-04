import { Category } from './category';
import { User } from './user';

export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  content: string;
  rating: number;
  stock: number;
  discount: number;
  registration: string;
  categories: Category[];
  client: User;
  imageProfile: {
    imageName: string;
    urlImage: string;
  };
  imagesPost: [
    {
      imageName: string;
      urlImage: string;
    }
  ];
  quantitySold: number;
}
