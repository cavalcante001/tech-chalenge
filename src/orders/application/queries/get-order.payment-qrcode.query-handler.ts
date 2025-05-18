import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from './get-orders.query';
import { Order } from '../../domain/order';
import { OrderRepository } from '../ports/order.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';
import { GetOrderPaymentQrcodeQuery } from './get-order.payment-qrcode';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOrderPaymentQrcodeQuery)
export class GetOrderPaymentQrcodeQueryHandler implements IQueryHandler<GetOrderPaymentQrcodeQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderPaymentQrcodeQuery) {
    const order = await this.orderRepository.findById(query.id);
    
    if (!order) {
      throw new NotFoundException(`Order with id ${query.id} not found`);
    }

    return order.total;
  }
} 