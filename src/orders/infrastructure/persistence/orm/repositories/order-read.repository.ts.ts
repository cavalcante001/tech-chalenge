import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderReadRepository } from 'src/orders/application/ports/order-read.repository';
import { OrderReadModel } from 'src/orders/domain/read-models/order.read-model';
import { OrderSummaryView } from '../views/order-summary.view';
import { GetOrdersQuery } from 'src/orders/application/queries/get-orders.query';

@Injectable()
export class OrmOrderReadyRepository implements OrderReadRepository {
  constructor(
    @InjectRepository(OrderSummaryView)
    private readonly orderSummaryView: Repository<OrderReadModel>,
  ) {}

  async findAll(getOrdersQuery: GetOrdersQuery): Promise<OrderReadModel[]> {
    const where: any = {};

    const statusMap: Record<string, string> = {
      pending: 'Pagamento pendente',
      received: 'Recebido',
      preparing: 'Em preparação',
      ready: 'Pronto',
      finished: 'Finalizado',
    };

    if (getOrdersQuery.paymentStatus) {
      where.status = statusMap[getOrdersQuery.paymentStatus];
    }

    return await this.orderSummaryView.find({ where });
  }

  async findById(id: string): Promise<OrderReadModel | null> {
    return await this.orderSummaryView.findOne({ where: { idPedido: id } });
  }
}
