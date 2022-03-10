import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../_model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  checkoutUrl: string = 'http://localhost:8080/api/v1/carts';

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;

  constructor(private router: Router, private httpClient: HttpClient) {
    let myStorageData = JSON.parse(this.storage.getItem('cartItems'));
    if (myStorageData != null) {
      this.cartItems = myStorageData;
      this.computeCartTotals();
    }
  }

  // POST Cart:
  proceedToCheckout(myCart: any) {
    return this.httpClient.post(this.checkoutUrl, myCart);
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
      foundCartItem.amount++;
    } else {
      // Add to Cart:
      this.cartItems.push(myCartItem);
    }
    // TOTALS:
    this.computeCartTotals();
  }

  // DECREASE
  decreaseQuantity(myCartItem: CartItem) {
    myCartItem.amount--;
    if (myCartItem.amount === 0) {
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
      totalPriceValue += cartItem.amount * cartItem.price;
      totalQuantityValue += cartItem.amount;
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

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
