import { OrderItem } from './order-item';
import { OrderStatus } from './value-objects/order-status';

export class Order {
  public items = new Array<OrderItem>();
  public customerId: string | null;
  public status: OrderStatus;

  private _transactionCode: string | null = null;
  private _paidAt: Date | null = null;
  private _amountPaid: number = 0;

  constructor(public readonly id: string) {}

  addOrderItem(item: OrderItem) {
    this.items.push(item);
  }

  get total() {
    return this.items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  markAsPaid(transactionCode: string, paidAt: Date, amountPaid: number) {
    this._transactionCode = transactionCode;
    this._paidAt = paidAt;
    this._amountPaid = amountPaid;
    this.status = new OrderStatus('received');
  }

  get transactionCode(): string | null {
    return this._transactionCode;
  }

  get paidAt(): Date | null {
    return this._paidAt;
  }

  get amountPaid(): number {
    return this._amountPaid;
  }
}
