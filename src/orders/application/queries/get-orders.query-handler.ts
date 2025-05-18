import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from './get-orders.query';
import { Order } from '../../domain/order';
import { OrderReadRepository } from '../ports/order-read.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';

@QueryHandler(GetOrdersQuery)
export class GetOrdersQueryHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly orderReadRepository: OrderReadRepository) {}

  async execute(): Promise<OrderReadModel[]> {
    return this.orderReadRepository.findAll();
  }
} 