import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from './get-order.query';
import { OrderReadyRepository } from '../ports/order-ready.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly findOrdersRepository: OrderReadyRepository) {}

  async execute(query: GetOrderQuery): Promise<OrderReadModel> {
    const order = await this.findOrdersRepository.findById(query.id);
    if (!order) {
      throw new NotFoundException(`Order with id ${query.id} not found`);
    }
    return order;
  }
} 