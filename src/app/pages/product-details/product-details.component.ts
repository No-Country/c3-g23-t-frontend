import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/_model/cart-item';
import { Product } from 'src/app/_model/product';
import { CartService } from 'src/app/_service/cart.service';
import { ProductsService } from 'src/app/_service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  detailedProduct: Product = new Product();
  activeImageUrl: string;
  stars: number = 0;
  selectedIndex: number = null;
  myCartItem: CartItem;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    const prodId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductDetails(prodId).subscribe((data) => {
      this.detailedProduct = data;
      this.activeImageUrl = data.imageProfile.urlImage;
      this.stars = data.rating;
      console.log(data);
    });
  }

  setIndex(index: number, url: string) {
    this.selectedIndex = index;
    this.activeImageUrl = url;
  }

  addToCart() {
    this.myCartItem = new CartItem(this.detailedProduct);
    this.cartService.addToCart(this.myCartItem);
    this.router.navigateByUrl('/pages/cart');
  }
}
