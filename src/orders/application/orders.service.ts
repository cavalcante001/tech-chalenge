import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from '../presenters/dto/update-order.dto';
import { CreateOrderCommand } from './commands/create-order.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetOrdersQuery } from './queries/get-orders.query';
import { GetOrderQuery } from './queries/get-order.query';
import { GetOrderPaymentQrcodeQuery } from './queries/get-order.payment-qrcode';

@Injectable()
export class OrdersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createOrderCommand: CreateOrderCommand) {
    return this.commandBus.execute(createOrderCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetOrdersQuery());
  }

  findOne(id: string) {
    return this.queryBus.execute(new GetOrderQuery(id));
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
  generatePaymentQrcode(id: string) {
    return this.queryBus.execute(new GetOrderPaymentQrcodeQuery(id));
  }
}
