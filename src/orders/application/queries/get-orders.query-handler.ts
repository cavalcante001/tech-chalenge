import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from './get-orders.query';
import { Order } from '../../domain/order';
import { OrderRepository } from '../ports/order.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';

@QueryHandler(GetOrdersQuery)
export class GetOrdersQueryHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly orderReadRepository: OrderReadyRepository) {}

  async execute(): Promise<OrderReadModel[]> {
    return this.orderReadRepository.findAll();
  }
} 