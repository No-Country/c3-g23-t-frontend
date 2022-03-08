import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilteredProduct } from 'src/app/_model/filteredProduct';
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
  searchMode: boolean = false;
  priceNumber: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProds();
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
}
