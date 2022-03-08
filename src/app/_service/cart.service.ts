import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../_model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  checkoutUrl: string = '';

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;

  constructor(private router: Router) {
    let myStorageData = JSON.parse(this.storage.getItem('cartItems'));
    if (myStorageData != null) {
      this.cartItems = myStorageData;
      this.computeCartTotals();
    }
  }

  // ADD
  addToCart(myCartItem: CartItem) {
    // Already in Cart?
    let alreadyInCart: boolean = false;
    let foundCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      foundCartItem = this.cartItems.find(
        (tempItem) => tempItem.id === myCartItem.id
      )!;

      alreadyInCart = foundCartItem != undefined;
    }
    if (alreadyInCart) {
      // Increment QTY for existing Item:
      foundCartItem.quantity++;
    } else {
      // Add to Cart:
      this.cartItems.push(myCartItem);
    }
    // TOTALS:
    this.computeCartTotals();
  }

  // DECREASE
  decreaseQuantity(myCartItem: CartItem) {
    myCartItem.quantity--;
    if (myCartItem.quantity === 0) {
      this.removeFromCart(myCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  // CALCULAR TOTALS:
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.price;
      totalQuantityValue += cartItem.quantity;
    }

    // Send DATA to Subscribers:
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // STORAGE:
    this.persistCartItems();
  }

  removeFromCart(myCartItem: CartItem) {
    // Get Index of myCartItem in the Array:
    const myIndex = this.cartItems.findIndex(
      (temp) => temp.id === myCartItem.id
    );
    // Once found REMOVE IT:
    if (myIndex > -1) {
      this.cartItems.splice(myIndex, 1);
      this.computeCartTotals();
    }
  }

  deleteCart() {
    this.cartItems = [];
    this.persistCartItems();
    this.router.navigateByUrl('/pages/all-products');
  }

  proceedToCheckout() {}

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
