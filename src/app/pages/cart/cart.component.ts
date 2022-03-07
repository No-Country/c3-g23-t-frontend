import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/_model/cart-item';
import { CartService } from 'src/app/_service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQty: number = 0;
  shippingCost: number = 10;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe((data) => (this.totalQty = data));
    this.cartService.computeCartTotals();
  }

  incrementQty(myCartItem: CartItem) {
    this.cartService.addToCart(myCartItem);
  }

  decreaseQty(myCartItem: CartItem) {
    this.cartService.decreaseQuantity(myCartItem);
  }

  removeFromCart(myCartItem: CartItem) {
    this.cartService.removeFromCart(myCartItem);
  }
  
  cleanCart() {
    this.cartService.deleteCart();
  }

}
