import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/_model/cart-item';
import { CartService } from 'src/app/_service/cart.service';
import { UserService } from 'src/app/_service/user.service';

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

  myError: number = 200;
  loggedUser: string;

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listCartDetails();
    if (this.userService.currentUser != null) {
      this.loggedUser = this.userService.currentUser.email;
    }
  }

  // POST
  postCart() {
    const formCart = new FormData();
    var cartBlob = new Blob([JSON.stringify(this.cartItems)], {
      type: 'application/json',
    });
    formCart.append('cart', cartBlob);
    if (this.loggedUser) {
      this.cartService.proceedToCheckout(formCart).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          this.myError = err.status;
        },
      });
    } else {
      alert('Debes iniciar sesion');
      this.router.navigateByUrl('/login');
    }
  }
  // Methods
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
