import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cantItems: number = 2;
  cartItemsInfo: Dato[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemsInfo = [
      {
        name: 'Autito',
        price: 200,
        qty: 2,
      },
      {
        name: 'Cactus',
        price: 50,
        qty: 5,
      },
      {
        name: 'Zapas',
        price: 2500,
        qty: 1,
      },
    ];
  }
}
export class Dato {
  name: string;
  price: number;
  qty: number;
}
