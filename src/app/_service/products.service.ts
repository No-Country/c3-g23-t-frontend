import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/featuredProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseFeaturedProductsUrl =
    'http://localhost:8080/api/v1/category/active';

  constructor(private httpClient: HttpClient) {}

  getFeaturedProducts() {
    return this.httpClient.get<Product[]>(this.baseFeaturedProductsUrl);
  }
}
