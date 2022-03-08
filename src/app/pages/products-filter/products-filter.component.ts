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
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
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
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleListProducts() {
    const hasPrice: boolean = this.route.snapshot.paramMap.has('price');
    if (hasPrice) {
      this.priceNumber = +this.route.snapshot.paramMap.get('price')!;
    }
    this.priceNumber = null;
  }
  
  handleSearchProducts() {
    throw new Error('Method not implemented.');
  }
}
