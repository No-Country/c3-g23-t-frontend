import { Category } from './category';
import { Usuarios } from './usuario';

export class FeaturedProduct {
  id: number;
  name: string;
  price: number;
  content: string;
  description: string;
  rating: number;
  stock: number;
  registration: string;
  discount: number;
  client: Usuarios;
  categories: Category[];
}
