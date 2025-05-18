import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from './get-orders.query';
import { Order } from '../../domain/order';
import { OrderRepository } from '../ports/order.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';
import { GetOrderPaymentQrcodeQuery } from './get-order.payment-qrcode';

@QueryHandler(GetOrderPaymentQrcodeQuery)
export class GetOrderPaymentQrcodeQueryHandler implements IQueryHandler<GetOrderPaymentQrcodeQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderPaymentQrcodeQuery) {
    return this.orderRepository.findById(query.id);
  }
} 