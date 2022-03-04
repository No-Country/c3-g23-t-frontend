import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeaturedProduct } from '../_model/featuredProduct';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseFeaturedProductsUrl = 'http://localhost:8080/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  // GET
  getFeaturedProducts() {
    return this.httpClient.get<FeaturedProduct[]>(this.baseFeaturedProductsUrl);
  }

  getProductDetails(prodId: number) {
    return this.httpClient.get<Product>(
      `${this.baseFeaturedProductsUrl}/${prodId}`
    );
  }

  getProductsByCategoryId(catId: number) {
    return this.httpClient.get<Product[]>(
      `${this.baseFeaturedProductsUrl}/category?category=${catId}`
    );
  }

  getProductsByUser(currentUser: string) {
    return this.httpClient.get<Product[]>(
      `${this.baseFeaturedProductsUrl}/${currentUser}`
    );
  }

  // POST
  createNewProduct(productForm: FormData) {
    return this.httpClient.post(this.baseFeaturedProductsUrl, productForm);
  }
}

// Interface
