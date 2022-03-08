import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeaturedProduct } from '../_model/featuredProduct';
import { FilteredProduct } from '../_model/filteredProduct';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseFeaturedProductsUrl = 'http://localhost:8080/api/v1/products';

  constructor(private httpClient: HttpClient) {}

  // === Featured ===
  getAllFeaturedProducts() {
    return this.httpClient.get<FeaturedProduct[]>(
      `${this.baseFeaturedProductsUrl}/all`
    );
  }

  getAllProducts() {
    return this.httpClient.get<FilteredProduct[]>(
      `${this.baseFeaturedProductsUrl}/all`
    );
  }

  // Detailed:
  getProductDetails(prodId: number) {
    return this.httpClient.get<Product>(
      `${this.baseFeaturedProductsUrl}/${prodId}`
    );
  }

  //  === FILTERED ===
  getProductsFiltered() {
    return this.httpClient.get<Product[]>(
      `${this.baseFeaturedProductsUrl}/all`
    );
  }

  // === USER ===
  createNewProduct(productForm: FormData) {
    return this.httpClient.post(this.baseFeaturedProductsUrl, productForm);
  }

  getProductsByUser() {
    return this.httpClient.get<FeaturedProduct[]>(
      `${this.baseFeaturedProductsUrl}/me`
    );
  }

  deleteMyProduct(prodId: number) {
    console.log('Borrara el producto con ID: ' + prodId);
    this.httpClient.delete(`${this.baseFeaturedProductsUrl}/${prodId}`);
  }
}
