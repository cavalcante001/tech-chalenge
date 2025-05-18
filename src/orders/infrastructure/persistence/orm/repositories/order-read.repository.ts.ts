import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderReadyRepository } from 'src/orders/application/ports/order-ready.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';
import { OrderSummaryView } from '../views/order-summary.view';

@Injectable()
export class OrmOrderReadyRepository implements OrderReadyRepository {
  constructor(
    @InjectRepository(OrderSummaryView)
    private readonly orderSummaryView: Repository<OrderReadModel>,
  ) {}

  async findAll(): Promise<OrderReadModel[]> {
    return await this.orderSummaryView.find();
  }

  async findById(id: string): Promise<OrderReadModel | null> {
    return await this.orderSummaryView.findOne({ where: { idPedido: id } });
  }
}
