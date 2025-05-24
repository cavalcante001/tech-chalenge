export class GetOrdersQuery {
  constructor(
    public readonly paymentStatus?:
      | 'pending'
      | 'received'
      | 'preparing'
      | 'ready'
      | 'finished',
  ) {}
}