import { Component, OnInit } from '@angular/core';
import { FeaturedProduct } from 'src/app/_model/featuredProduct';
import { ProductsService } from 'src/app/_service/products.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit {
  myProds: FeaturedProduct[] = [];
  myError: number = 200;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductsByUser().subscribe({
      next: (response) => {
        this.myProds = response;
      },
      error: (err) => {
        this.myError = err.status;
      },
    });
  }

  // Delte:
  deleteMyProduct(prodId: number) {
    this.productsService.deleteMyProduct(prodId);
  }
}
