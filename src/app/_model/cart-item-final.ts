import { CartItem } from './cart-item';

export class FinalCartItem {
  id: number;
  amount: number;

  constructor(cartItem: CartItem) {
    this.id = cartItem.id;
    this.amount = cartItem.amount;
  }
}
