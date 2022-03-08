import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/_model/category';
import { FilteredProduct } from 'src/app/_model/filteredProduct';
import { Product } from 'src/app/_model/product';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductsService } from 'src/app/_service/products.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss'],
})
export class ProductsFilterComponent implements OnInit {
  allProds: FilteredProduct[];
  myError: number = 200;

  // Filters
  categories: Category[];
  selectedCat: string = 'Calzados';
  selectedName: string = '';

  selectedPrice: number = 1500;
  minPrice: number = 5;
  maxPrice: number = 3000;
  stepPrice: number = 50;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProds();
    this.populateCategories();
  }

  // Methods:
  getAllProds() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProds = response;
      },
      error: (err) => {
        this.myError = err.status;
      },
    });
  }
  populateCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        this.myError = err.status;
      },
    });
  }

  fireEndpoint() {
    this.productsService
      .getProductsFiltered(
        this.selectedName,
        this.selectedPrice,
        this.selectedCat
      )
      .subscribe({
        next: (response) => {
          this.myError = 200;
          this.allProds = response;
        },
        error: (err) => {
          this.myError = err.status;
        },
      });
  }
}
